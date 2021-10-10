import styled from "styled-components";
import { Text } from "grommet";
import { defaultProps } from 'grommet'
const EntrantsList = ({ players }) => {
  return (
    <ListContainer>
      <Text alignSelf="center">Player Entrants!</Text>
      {players.length === 0 ? (
        <EmptyList />
      ) : (
        <PlayerContainer>
          <PlayerList players={players} />
        </PlayerContainer>
      )}
    </ListContainer>
  );
};

const EmptyList = () => {
  return <div>There are currently no players!</div>;
};

const PlayerList = ({ players }) => {
  return players.map((player, index) => {
    return (
      <PlayerLink
      key={index}
        target="_blank"
        rel="noreferrer"
        href={`https://rinkeby.etherscan.io/address/${player}`}
      >
        {" "}
        {player}
      </PlayerLink>
    );
  });
};

const PlayerContainer = styled.div`
  margin-top: 10px;
`;

const PlayerLink = styled.a`
    color: ${defaultProps.theme.global.colors.text.dark};
`
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default EntrantsList;
