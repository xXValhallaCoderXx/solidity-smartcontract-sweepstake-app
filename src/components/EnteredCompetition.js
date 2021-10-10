import { Box, Text } from "grommet";
import styled from "styled-components";
const EnteredCompetition = () => {
  return (
    <Box alignContent="center">
      <InfoText>
        You have entered the contest! You will be notified when it ends!
      </InfoText>
    </Box>
  );
};

const InfoText = styled(Text)`
  text-align: center;
`;

export default EnteredCompetition;
