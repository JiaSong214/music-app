import '../styles/modal.scss';

const Modal = ({isActive, onModal}) => {
  return (
    <aside className={isActive ? 'modal active' : 'modal'}>
      <p className='modal__text'>
        Song might be not be able to play due to API provide.
      </p>
      <div className='buttonBox'>
        <div className='modal__closeBtn' onClick={onModal}>GOT IT</div>
        <div className='modal__infoBtn'>MORE INFO</div>
      </div>
    </aside>
  );
}

export default Modal;