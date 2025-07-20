import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'diary-entries';
const MIN_LENGTH = 10;
const MAX_LENGTH = 1000;

interface DiaryEntry {
  date: string;
  text: string;
}

const Diary: React.FC = () => {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<DiaryEntry[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const isValid = input.trim().length >= MIN_LENGTH && input.trim().length <= MAX_LENGTH;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      setError(`Entry must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`);
      return;
    }
    setEntries([{ date: new Date().toLocaleString(), text: trimmed }, ...entries]);
    setInput('');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (error) setError('');
  };

  const handleDelete = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  return (
    <div className="diary">
      <h2>Diary</h2>
      <form className="diary__form" onSubmit={handleAdd}>
        <textarea
          className="diary__input"
          placeholder="Write your diary entry..."
          value={input}
          onChange={handleInputChange}
          maxLength={MAX_LENGTH + 1}
        />
        <div className="diary__char-counter" style={{ color: input.length > MAX_LENGTH ? '#dc3545' : '#888' }}>
          {input.length} / {MAX_LENGTH}
        </div>
        {error && <div className="diary__error">{error}</div>}
        <button className="diary__add-btn" type="submit" disabled={!isValid}>
          Add Entry
        </button>
      </form>
      <div className="diary__entries">
        {entries.length === 0 ? (
          <div className="diary__empty">No entries</div>
        ) : (
          entries.map((entry, idx) => (
            <div className="diary__entry" key={idx}>
              <div className="diary__date">{entry.date}</div>
              <div className="diary__text">{entry.text}</div>
              <button className="diary__delete-btn" onClick={() => handleDelete(idx)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Diary; 