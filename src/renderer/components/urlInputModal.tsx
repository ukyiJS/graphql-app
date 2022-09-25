import * as style from '@renderer/styles/urlInputModal.css';
import { useIpcOn } from '@renderer/hooks/useIpcRenderer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import Modal from 'react-modal';

const Line = () => (
  <div>
    --------------------------------------------------------------------------------------------------------------------------------------------
  </div>
);

export default function UrlInputModal() {
  const [headerState, setHeaderState] = useState('');
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: history = [] } = useQuery(['history'], () => window.app.invoke<string[]>('get-history'));
  const { mutate: setHistory } = useMutation(['history'], (historyList: string[]) => window.app.invoke('set-history', historyList));
  const queryClient = useQueryClient();

  useIpcOn('url-input-click', () => setIsOpen(true));

  const closeModal = () => setIsOpen(false);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/[^a-zA-Z\d\-_.:/]/g.test(value)) return;
    setText(value);
  };
  const onInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const historyList = [...(history ?? []), text];
    setHistory(historyList);
    queryClient.setQueryData(['history'], historyList);
    setText('');
  };
  const windowState = () => {
    if (headerState === 'minimize') return style.windowMinimized;
    if (headerState === 'maximize') return style.windowMaximized;
    return '';
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName="graphiql-container overlay"
      className={`${style.modalContainer} ${windowState()}`}>
      <header className={style.header}>
        <div className="button red" onClick={closeModal} aria-hidden />
        <div className="button yellow" onClick={() => setHeaderState('minimize')} aria-hidden />
        <div
          className="button green"
          onClick={() => setHeaderState(['maximize', 'minimize'].some(s => s === headerState) ? '' : 'maximize')}
          aria-hidden
        />
      </header>
      <main className={style.contents} onClick={() => inputRef.current?.focus()} aria-hidden>
        {history?.length ? (
          <>
            <Line />
            <div>URL List</div>
            <Line />
            {history?.map(history => (
              <div key={history} className={style.prompt}>
                - {history}
              </div>
            ))}
            <Line />
          </>
        ) : (
          ''
        )}
        <div className={style.prompt}>
          <span className={style.cursorIndicator}>$&nbsp;</span>
          <input
            type="text"
            ref={inputRef}
            autoFocus
            placeholder="URL 입력"
            onChange={onInputChange}
            onKeyUp={onInputKeyUp}
            value={text}
            className={style.promptInput}
          />
        </div>
      </main>
    </Modal>
  );
}
