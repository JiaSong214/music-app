import '../styles/modal.scss';

const Modal = (state) => {

  const closeModal = (e) => {
    e.target.closest('.modal').style.display = 'none';
  }

  return (
    <aside className={state.active ? 'modal active' : 'modal'}>
      <p className='modal__text'>
        Song might be not be able to play due to API provide.
      </p>
      <div className='buttonBox'>
        <div className='modal__closeBtn' onClick={(e) => closeModal(e)}>GOT IT</div>
        <div className='modal__infoBtn'>MORE INFO</div>
      </div>
    </aside>
  );
}

export default Modal;