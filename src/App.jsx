
import './App.css'
import CostumeTimeline from './components/CostumTimeline'
import ButtonBar from './components/button-bar/ButtonBar';
import EditItemsForms from './components/form/EditItemsForms';
import Modal from './components/modal/Modal';

function App() {
  
  return (
    <>
    <div>
      <Modal>
        <EditItemsForms/>
      </Modal>
      <CostumeTimeline/>
      <ButtonBar/>
    </div>
    </>
  )
}

export default App
