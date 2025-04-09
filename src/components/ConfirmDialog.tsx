interface ConfirmProps {
  title: string,
  message: string,
  show: boolean
  onClose: () => void,
  onConfirm: () => void
}

const ConfirmDialog = ({title, message, show, onClose, onConfirm}: ConfirmProps) => {
  if (!show) {
    return null;
  }
  return(
    <div className="modal show d-block" tabIndex={-1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button className="btn-close" type="button" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-sm btn-secondary" type="button" onClick={onClose}>Cancel</button>
            <button className="btn btn-sm btn-primary" type="button" onClick={onConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog;