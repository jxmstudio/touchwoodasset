import type { JxmAttachment } from '@/lib/jxm-forms'

/** The per-file limit on JXM Forms' attachment storage. */
export const RESUME_MAX_BYTES = 10 * 1024 * 1024

const RESUME_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

/** Most phones filter their file picker on the types, not the extensions. */
export const RESUME_ACCEPT = [
  ...Object.keys(RESUME_TYPES).map((extension) => `.${extension}`),
  ...Object.values(RESUME_TYPES),
].join(',')

/**
 * Goes by the file's extension rather than `file.type`: browsers can report a
 * Word file with a blank or generic type, and storage refuses an upload whose
 * type isn't on its allowed list.
 */
export function resumeContentType(filename: string): string | null {
  const name = filename.toLowerCase()
  const extension = Object.keys(RESUME_TYPES).find((type) =>
    name.endsWith(`.${type}`)
  )
  return extension ? RESUME_TYPES[extension] : null
}

/**
 * Sends a resume to JXM Forms' storage and returns what the submission needs
 * to carry as `_attachments`. Throws if it didn't get there.
 */
export async function uploadResume(file: File): Promise<JxmAttachment> {
  const response = await fetch('/api/resume-upload', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ filename: file.name, size: file.size }),
  })
  if (!response.ok) {
    throw new Error(`Resume upload URL returned ${response.status}`)
  }
  const { upload } = await response.json()

  const put = await fetch(upload.signed_url, {
    method: 'PUT',
    headers: { 'content-type': upload.content_type },
    body: file,
    // Long enough for 10 MB on a slow phone connection, but a stalled upload
    // must not leave the applicant waiting on a spinner forever.
    signal: AbortSignal.timeout(120_000),
  })
  if (!put.ok) {
    throw new Error(`Resume upload returned ${put.status}`)
  }

  return {
    path: upload.path,
    filename: upload.filename,
    content_type: upload.content_type,
    size: upload.size,
  }
}
