import React from 'react';
import { HighFiPrototype } from './components/HighFiPrototype';
import { Toaster } from 'sonner';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen w-full bg-[#FAF7F2] overflow-hidden">
        <Toaster position="top-center" />
        <HighFiPrototype />
      </div>
    </DndProvider>
  );
}

export default App;