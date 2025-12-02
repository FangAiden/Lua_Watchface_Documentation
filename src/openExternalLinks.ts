// src/openExternalLinks.ts
import { open } from '@tauri-apps/plugin-shell';

function shouldOpenExternally(a: HTMLAnchorElement) {
  if (!a.href) return false;
  const url = new URL(a.href, window.location.href);
  const isHttp = url.protocol === 'http:' || url.protocol === 'https:';
  const isExternal = url.origin !== window.location.origin;
  return isHttp && isExternal;
}

export default function enableExternalLinks() {
  if (typeof window === 'undefined') return;
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a) return;
    if (!shouldOpenExternally(a)) return;
    e.preventDefault();
    open(a.href); // 用系统默认浏览器打开
  });
}
