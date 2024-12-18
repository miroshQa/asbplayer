export function bufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const length = bytes.byteLength;

    for (let i = 0; i < length; ++i) {
        binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
}

export async function fileUrlToBase64(fileUrl: string): Promise<string> {
    return bufferToBase64(await (await fetch(fileUrl)).arrayBuffer());
}

export const blobToBase64 = (blob: Blob) => {
    return new Promise<string>(async (resolve, reject) => {
        try {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const result = reader.result as string;
                const base64 = result.substring(result.indexOf(',') + 1);
                resolve(base64);
            };
        } catch (e) {
            reject(e);
        }
    });
};

export const base64ToBlob = (base64: string, mimeType: string) => {
    const decoded = atob(base64);
    const buffer = new Uint8Array(decoded.length);

    for (let i = 0; i < buffer.length; ++i) {
        buffer[i] = decoded.charCodeAt(i);
    }

    return new Blob([buffer.buffer], { type: mimeType });
};
