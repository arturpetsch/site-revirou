import React from 'react';

export default function Custom500() {
  return (
  <div>
    {someObject.message} // ou qualquer propriedade
    {/* ou */}
    {JSON.stringify(someObject)}
  </div>
);
}
