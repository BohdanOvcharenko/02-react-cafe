import CafeInfo from '../CafeInfo/CafeInfo.tsx';
import type { Votes, VoteType } from '../../types/votes';
import css from './App.module.css';
import { useState } from 'react';
import VoteOptions from '../VoteOptions/VoteOptions.tsx';
import VoteStats from '../VoteStats/VoteStats.tsx';

const initialVotes: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
};




function App() {
  const [votes, setVotes] = useState<Votes>(initialVotes);

   const totalVotes = votes.good + votes.neutral + votes.bad;

const positiveRate = totalVotes ? (votes.good / totalVotes) * 100 : 0;

  const handleVote = (type: VoteType): void => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1,
    }));
  };

  const resetVotes = (): void => {
    setVotes(initialVotes);
  };

  return (
    <div className={css.app}>
      <CafeInfo />

      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes === 0 ? (
        <p className={css.message}>No feedback yet</p>
      ) : (
        <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />
      )}
    </div>
  );
}

export default App;