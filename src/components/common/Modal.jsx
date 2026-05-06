import Button from './Button'
import { cx } from '../../utils/classNames'

function Modal({ children, className, isOpen, onClose, title }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        onClick={onClose}
        type="button"
      />
      <section
        aria-label={title}
        aria-modal="true"
        className={cx(
          'relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-4xl border border-line bg-canvas-elevated p-6 shadow-glow',
          className,
        )}
        role="dialog"
      >
        {children}
      </section>
    </div>
  )
}

function ModalHeader({ children, className, onClose }) {
  return (
    <div className={cx('mb-5 flex items-start justify-between gap-4', className)}>
      <div>{children}</div>
      {onClose ? (
        <Button aria-label="Close modal" onClick={onClose} size="sm" variant="ghost">
          Close
        </Button>
      ) : null}
    </div>
  )
}

function ModalBody({ children, className }) {
  return <div className={cx('space-y-4', className)}>{children}</div>
}

function ModalFooter({ children, className }) {
  return <div className={cx('mt-6 flex flex-wrap justify-end gap-3', className)}>{children}</div>
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal
