import web3 from "./web-3";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Header, Text, Heading, Card, Box, Notification } from "grommet";
import sweepstake from "./contracts/sweepstake";
import EnterSneakySweepForm from "./components/Form-EnterCompetition";
import EntrantsList from "./components/Entrants";
import EnteredCompetition from "./components/EnteredCompetition";
function App() {
  const [isInit, setIsInt] = useState(false);
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [prize, setPrize] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isEntered, setIsEntered] = useState(false);
  const [playerAccount, setPlayerAccount] = useState("");
  useEffect(() => {
    const init = async () => {
      // When  using metamask provider - No need to add From
      const manager = await sweepstake.methods.owner().call();
      const players = await sweepstake.methods.getCurrentEntrants().call();
      const prize = await web3.eth.getBalance(sweepstake.options.address);
      const accounts = await web3.eth.getAccounts();
      setPlayerAccount(accounts[0]);

      setIsEntered(players.includes(accounts[0]));
      setManager(manager);
      setPlayers(players);
      setPrize(prize);
      setIsInt(true);
    };
    init();
  }, []);
  console.log("MANG:", isEntered);
  const handleOnSubmit = async (value) => {
    if (!value) {
      setError("Value can not be empty!");
      return;
    }
    setIsSubmitting(true);
    try {
      const accounts = await web3.eth.getAccounts();
      // We will assume that first account is one we will use
      const result = await sweepstake.methods.enterSweepstake().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      console.log("wht is :", result);
      setIsSubmitting(false);
      setMessage("You have been entered! - Good Luck!");
    } catch (e) {
      console.log("hmm: ", e);
      setIsSubmitting(false);
      setError("There was an error submitting :(");
    }
  };
  if (!isInit) {
    return (
      <PageContainer>
        <Header background="light-4" pad="small">
          <Text size="small">Header</Text>
        </Header>

        <Box align="center" height="large" pad="large">
          LOADING
        </Box>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <Header background="light-4" pad="small">
        <Text size="small">Header</Text>
      </Header>
      <Box align="center">
        <Heading>Sneaky Sweeps</Heading>
        <Heading level="3">
          Current Prize: {web3.utils.fromWei(prize, "ether")}
        </Heading>
      </Box>

      <Box align="center" pad="large">
        <Box gap="medium" width="medium">
          <Card pad="medium" background="dark-1" gap="medium">
            {isEntered ? (
              <EnteredCompetition />
            ) : (
              <EnterSneakySweepForm
                onSubmit={handleOnSubmit}
                loading={isSubmitting}
                message={message}
                error={error}
              />
            )}
          </Card>
        </Box>
        <Box align="center" pad="medium">
          <Card pad="medium" background="dark-1" gap="medium">
            <EntrantsList players={players} />
          </Card>
        </Box>
      </Box>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  height: 100%;
`;

export default App;
