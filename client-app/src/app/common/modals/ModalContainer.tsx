import { observer } from "mobx-react-lite";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";

export default observer(function ModalContiner() {
    const {modalStore} = useStore();

    return (
        <Modal 
            open={modalStore.modal.open} 
            onClose={modalStore.closeModal}
            size='mini'
        >
            {modalStore.modal.body}
        </Modal>
    );
});