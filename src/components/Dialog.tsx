import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { Icon } from './Icon';
export function Dialog({ title, close, children, wide = false }: { title: string; close: () => void; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current!; dialog.showModal();
    return () => { dialog.close(); previous?.focus(); };
  }, []);
  return <dialog className={`dialog-shell ${wide ? 'wide' : ''}`} ref={ref} onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }} aria-labelledby={titleId}>
    <div className="modal-card"><button className="modal-close" onClick={close} aria-label="Đóng cửa sổ"><Icon name="close" /></button><span className="modal-kicker">HÀNH TRÌNH TÌM ĐƯỜNG CỨU NƯỚC</span><h2 id={titleId}>{title}</h2>{children}</div>
  </dialog>;
}
