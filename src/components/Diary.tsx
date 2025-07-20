import React, { useState, useEffect } from 'react';
import './Diary.scss';

const LOCAL_STORAGE_KEY = 'diary-entries';

const Diary: React.FC = () => {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<string[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setEntries([{ date: new Date().toLocaleString(), text: trimmed }, ...entries]);
    setInput('');
  };

  return (
    <div className="diary">
      <h2>Diary</h2>
      <form className="diary__form" onSubmit={handleAdd}>
        <textarea
          className="diary__input"
          placeholder="Write your diary entry..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="diary__add-btn" type="submit">Add Entry</button>
      </form>
      <div className="diary__entries">
        {entries.length === 0 ? (
          <div className="diary__empty">No entries</div>
        ) : (
          entries.map((entry: any, idx) => (
            <div className="diary__entry" key={idx}>
              <div className="diary__date">{entry.date}</div>
              <div className="diary__text">{entry.text}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Diary; 