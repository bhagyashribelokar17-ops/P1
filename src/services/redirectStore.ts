let pendingRedirect: string | null = null;

export function setPendingRedirect(path: string) {
  pendingRedirect = path;
}

export function consumePendingRedirect() {
  const path = pendingRedirect;
  pendingRedirect = null;
  return path;
}
