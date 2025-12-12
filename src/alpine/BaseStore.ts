export class AvBaseStore {
  isLoading = false;
  error: string | null = null;
  toast: { type: "success" | "error"; message: string } | null = null;

  setLoading(v: boolean) { this.isLoading = v; }
  setError(msg: string | null) { this.error = msg; }
  clearError() { this.error = null; }

  notify(type: "success" | "error", message: string) {
    this.toast = { type, message };
    window.setTimeout(() => {
      if (this.toast?.message === message) this.toast = null;
    }, 2500);
  }

  confirm(message: string) {
    return window.confirm(message);
  }
}

export function safeErrorMessage(err: unknown, fallback = "Something went wrong.") {
  if (err && typeof err === "object" && "message" in err) {
    const msg = (err as any).message;
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  return fallback;
}
