
import React, { memo } from 'react';

const Header: React.FC<{ onAddFood: () => void }> = ({ onAddFood }) => {
  return (
    <div className="sticky top-0 z-40 bg-white">
      {/* Top black border */}
      <div className="h-px w-full bg-gray-900" />
      
      <header className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjZjU5ZTBiIj48cGF0aCBkPSJNNDY0IDEyOGgtMzJ2LTQ4YzAtMTcuNjctMTQuMzMtMzItMzItMzJIMTEyYy0xNy42NyAwLTMyIDE0LjMzLTMyIDMydjQ4SDQ4Yy0yNi41MSAwLTQ4IDIxLjQ5LTQ4IDQ4djIyNGMwIDI2LjUxIDIxLjQ5IDQ4IDQ4IDQ4aDE2di02NGMwLTM1LjM1IDI4LjY1LTY0IDY0LTY0aDE5MmMzNS4zNSAwIDY0IDI4LjY1IDY0IDY0djY0aDE2YzI2LjUxIDAgNDgtMjEuLjQ5IDQ4LTQ4VjE3NmMwLTI2LjUxLTIxLjQ5LTQ4LTQ4LTQ4ek0xMjggMzUyYy0xNy42NyAwLTMyIDE0LjMzLTMyIDMyczE0LjMzIDMyIDMyIDMyIDMyLTE0LjMzIDMyLTMyLTE0LjMzLTMyLTMyLTMyem0yNTYgMGMtMTcuNjcgMC0zMiAxNC4zMy0zMiAzMnMxNC4zMyAzMiAzMiAzMiAzMi0xNC4zMyAzMi0zMi0xNC4zMy0zMi0zMi0zMnptMzItMTYwaC0zMnYtMzJjMC04Ljg0LTcuMTYtMTYtMTYtMTZoLTMyYy04Ljg0IDAtMTYgNy4xNi0xNiAxNnYzMmgtMzJ2LTMyYzAtOC48NC03LjE2LTE2LTE2LTE2aC0zMmMtOC44NCAwLTE2IDcuMTYtMTYgMTZ2MzJoLTMydi0zMmMwLTguODQtNy4xNi0xNi0xNi0xNmgtMzJjLTguODQgMC0xNiA3LjE2LTE2IDE2djMyaC0zMnYtOTZoMjU2djk2eiIvPjwvc3ZnPg=="
            alt="FoodWagen Logo"
            className="h-8 w-8"
          />
          <h1 className="text-3xl font-extrabold">
            <span className="text-yellow-500">Food</span><span className="text-orange-500">Wagen</span>
          </h1>
        </div>
        <button
          onClick={onAddFood}
          data-test-id="food-add-btn"
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-b from-yellow-400 to-orange-500 px-6 py-2 text-base font-medium text-white shadow-lg shadow-orange-500/40 transition-all hover:shadow-xl hover:shadow-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Add Food
        </button>
      </header>
      
      {/* Bottom gradient border */}
      <div className="h-1 w-full bg-gradient-to-r from-yellow-400 to-orange-500" />
    </div>
  );
};

export default memo(Header);
