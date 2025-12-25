export function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    }

    return String(text).replace(/[&<>"'/]/g, char => map[char] ?? char)
}

export function sanitizeString(value: any): string {
    return String(value ?? '').replace(/<[^>]*>/g, '')
}
