import axios from 'axios';
// @ts-ignore
import { useGlobalProvider } from '../hooks/AppContext';
import { useEffect } from 'react';

const Line: React.FC<LineProps> = ({ item, port, numberItem }) => {
  const { setIsClicked } = useGlobalProvider();

  const street: string = Object.keys(item)[0];

  const lineStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0rem',
    margin: '0rem',
    alignItems: 'center',
    flexDirection: 'column',
  };
  const buttonsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const modifyItem = async (
    number: number,
    street: string,
    value: string,
    action: string
  ) => {
    console.log(number, street, value, action);
    const response = await axios.post(`http://localhost:${port}`, {
      street,
      number,
      value,
      action,
    });
    console.log(response.data, 'response data');
  };

  const handleValue =
    (street: string, action: string) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsClicked(true);
      const value = e.currentTarget.id;
      const clickedButton = e.currentTarget.innerText;
      let number = 0;
      if (clickedButton === '-1') {
        number = -1;
      } else {
        number = +1;
      }
      console.log(number, street, value, action);
      modifyItem(number, street, value, action);
    };

  // Definisci un oggetto che mappa ciascuna street al suo colore corrispondente
  const colorMap = {
    limpato: 'grigio',
    'fish pfC': 'verde',
    'fish pfR': 'rosso',
    raise: 'marrone',
    'river fold': 'blue',
    'F-T fold': 'viola',
  };

  // Calcola il colore corrispondente in base alla street
  const getBackgroundColor = (street) => {
    const color = colorMap[street] || 'white'; // Se la street non corrisponde a nessun colore specificato, usa 'white' come fallback
    switch (color) {
      case 'grigio':
        return 'grey';
      case 'verde':
        return 'green';
      case 'rosso':
        return 'red';
      case 'marrone':
        return '#5D4037'; // Marrone più scuro
      case 'blue':
        return 'blue';
      case 'viola':
        return 'purple';
      default:
        return 'white'; // Colore di fallback nel caso in cui la street non corrisponda a nessun colore specificato
    }
  };

  useEffect(() => {
    item = item;
  }, [item]);

  return (
    <div style={lineStyle}>
      {/* <p style={{ fontSize: '2rem' }}>{street}</p> */}
      {item[street].map((line, index) => {
        const action = Object.keys(line)[0]; // Definisci l'azione qui
        const value = line[action]['value']; // Definisci il bluff qui
        const bluff = line[action]['bluff']; // Definisci il valore1 qui
        const call = line[action]['call']; // Definisci il valore2 qui
        const fold = line[action]['fold']; // Definisci il valore3 qui

        const sample = numberItem > 3 ? call + fold : bluff + value;

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: '1rem',
              margin: '0rem',
              alignItems: 'center',
              backgroundColor: getBackgroundColor(street),
            }}>
            <p>{Object.keys(line)[0]}</p>
            <div id="value" style={buttonsStyle}>
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={handleValue(street, action)}
                    id={numberItem > 3 ? 'call' : 'value'}>
                    -1
                  </button>
                  <button
                    style={{ color: 'green' }}
                    onClick={handleValue(street, action)}
                    id={numberItem > 3 ? 'call' : 'value'}>
                    {numberItem > 3 ? 'C' : 'V'}
                  </button>
                </div>
              </div>
            </div>
            <div style={buttonsStyle}>
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                  <button
                    onClick={handleValue(street, action)}
                    id={numberItem > 3 ? 'fold' : 'bluff'}>
                    -1
                  </button>
                  <button
                    style={{ color: 'green' }}
                    onClick={handleValue(street, action)}
                    id={numberItem > 3 ? 'fold' : 'bluff'}>
                    {numberItem > 3 ? 'F' : 'B'}
                  </button>
                </div>
              </div>
            </div>
            {numberItem <= 3 ? (
              sample ? (
                <p>Bluff: {((bluff / sample) * 100).toFixed(1)}%</p>
              ) : (
                <p>NN</p>
              )
            ) : sample ? (
              <p>Fold: {((fold / sample) * 100).toFixed(1)}%</p>
            ) : (
              <p>NN</p>
            )}
            {sample ? <p>Sample: {sample}</p> : <p>0</p>}
          </div>
        );
      })}
    </div>
  );
};

export default Line;
