import React, { useCallback } from 'react';
import { Layout } from 'antd';

import useStories from './useStories';
import useUsers from './useUsers';
import useVotes from './useVotes';

import { Buttons, Cardboard, StoriesList, UsersList } from '../../components';

import { UserType } from '../../types';

import './Room.css';

type RoomTypes = {
  currentUser: UserType;
  summary: number;
};

const { Content, Sider } = Layout;

const Room: React.FC<RoomTypes> = ({ currentUser, summary }) => {
  const {
    clearVotes,
    endVoting,
    setUserVote,
    userVote,
    vote,
    votes,
    votingEnded,
  } = useVotes();
  const {
    allStories,
    activeStories,
    closedStories,
    currentStory,
    addStory,
    removeStory,
    skipStory,
  } = useStories();
  const { isCurrentUserModerator, users } = useUsers(currentUser);

  const handleVote = useCallback(
    ({ storyId, points }) => {
      vote({ userId: currentUser._id, points, storyId });
    },
    [currentUser._id, vote],
  );

  const onCardClick = useCallback(
    (vote) => {
      if (Boolean(currentStory) && !votingEnded) {
        handleVote(vote);
        setUserVote(vote.points);
      }
    },
    [handleVote, setUserVote, currentStory, votingEnded],
  );

  const onClearVotes = () => {
    clearVotes({ storyId: currentStory?._id });
    setUserVote(false);
  };

  return (
    <Layout className="Room__Layout">
      <Content className="Room__Content">
        <Cardboard
          storyTitle={currentStory?.name}
          isActive={Boolean(currentStory)}
          userVote={userVote}
          onCardClick={(point) =>
            onCardClick({
              storyId: currentStory?._id,
              points: point,
            })
          }
        />
        <StoriesList
          allStories={allStories}
          activeStories={activeStories}
          closedStories={closedStories}
          handleAddStory={addStory}
          handleRemoveStory={removeStory}
          isUserModerator={isCurrentUserModerator}
        />
      </Content>
      <Sider theme="light" className="Room__Sidebar" width={350}>
        <UsersList
          votes={votes}
          voteEnded={votingEnded}
          isUserModerator={isCurrentUserModerator}
          users={users}
        />
        {isCurrentUserModerator && (
          <Buttons
            activeStory={currentStory}
            voteEnded={votingEnded}
            noVotes={Boolean(votes.length)}
            handleClearVotes={onClearVotes}
            handleSkipStory={skipStory}
            handleEndVoting={endVoting}
            summary={summary}
          />
        )}
      </Sider>
    </Layout>
  );
};

export default Room;
