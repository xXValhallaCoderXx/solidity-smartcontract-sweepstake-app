import web3 from "../web-3";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Header, Text, Heading, Card, Box } from "grommet";
import sweepstake from "../contracts/sweepstake";
import EnterSneakySweepForm from "../components/Form-EnterCompetition";
import EntrantsList from "../components/Entrants";
import EnteredCompetition from "../components/EnteredCompetition";
import PickWinner from "../components/PickWinner";

function EntryPage() {
  const [isInit, setIsInt] = useState(false);

  const [players, setPlayers] = useState([]);
  const [prize, setPrize] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [isEntered, setIsEntered] = useState(false);
  const [playerAccount, setPlayerAccount] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [ownerAccount, setOwnerAccount] = useState("");
  const [isPicking, setIsPicking] = useState(false);

  const init = async () => {
    // When  using metamask provider - No need to add From
    const manager = await sweepstake.methods.owner().call();
    const players = await sweepstake.methods.getCurrentEntrants().call();
    const prize = await web3.eth.getBalance(sweepstake.options.address);

    const accounts = await web3.eth.getAccounts();

    if (manager === accounts[0]) {
      setIsAuth(true);
    }

    setPlayerAccount(accounts[0]);

    setIsEntered(players.includes(accounts[0]));
    setOwnerAccount(manager);
    setPlayers(players);
    setPrize(prize);
    setIsInt(true);
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!isSubmitting || !isPicking) {
      init();
    }
  }, [isSubmitting, isPicking]);

  const handleOnSubmit = async (value) => {
    if (!value) {
      setError("Value can not be empty!");
      return;
    }
    setIsSubmitting(true);
    try {
      const accounts = await web3.eth.getAccounts();
      // We will assume that first account is one we will use
      await sweepstake.methods.enterSweepstake().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });

      setIsSubmitting(false);
    } catch (e) {
      console.log("hmm: ", e);
      setIsSubmitting(false);
      setError("There was an error submitting :(");
    }
  };

  const onClickPickWinner = async () => {
    setIsPicking(true);
    await sweepstake.methods.pickWinner().send({
      from: ownerAccount,
    });
    setIsPicking(false);
  };
  const onClearError = () => setError("");
  if (!isInit) {
    return (
      <PageContainer>
        <Header background="light-4" pad="small">
          <Text size="small">Connected Account: {playerAccount}</Text>
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
          <Text size="small">Connected Account: {playerAccount}</Text>
        </Header>
      <Box align="center">
        <Heading>Sneaky Sweeps</Heading>
        <Heading level="3">
          Current Prize: {web3.utils.fromWei(prize, "ether")} Ether
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
                error={error}
                clearError={onClearError}
              />
            )}
          </Card>
        </Box>
        <Box align="center" pad="medium">
          <Card pad="medium" background="dark-1" gap="medium">
            <EntrantsList players={players} />
          </Card>
        </Box>
        {isAuth && players.length > 0 && (
          <PickWinner loading={isPicking} onClick={onClickPickWinner} />
        )}
        <OwnerText>
          Sneaky Sweep Owner:
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://rinkeby.etherscan.io/address/${ownerAccount}`}
          >
            {ownerAccount}
          </a>
        </OwnerText>
      </Box>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  height: 100%;
`;

const OwnerText = styled(Text)`
  margin-top: 100px;
`;

export default EntryPage;
