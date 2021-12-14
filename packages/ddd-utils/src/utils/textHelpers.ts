import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!DOCTYPE html>');
const domPurify = DOMPurify(window);

function sanitize(unsafeText: string): string {
    return domPurify.sanitize(unsafeText);
}

function sanitizeObject(object: Record<string, unknown>): Record<string, unknown> {
    Object.keys(object).forEach(key => {
        const value = object[key];

        if (!value) {
            return;
        }

        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                object[key] = value.map(item => {
                    if (typeof item === 'string') {
                        return sanitize(item);
                    }
                    return sanitizeObject(item);
                });
            } else {
                sanitizeObject(value as Record<string, unknown>);
            }
            return;
        }

        if (typeof value === 'string') {
            object[key] = sanitize(value);
        }
    });

    return object;
}

export { sanitize, sanitizeObject };
