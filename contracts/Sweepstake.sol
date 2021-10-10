// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Sweepstake {
    address public owner; /* Creator of Sweepstake */
    address[] private entrants; /* Entrants of current sweepstake */
    mapping(address => bool) private entrantsThisRound; /* Private map of entrants */

    constructor() {
        owner = msg.sender;
    }

    function random() private view returns (uint256) {
        /* This is just a Pseudo random - Need to research this */
        /* Maybe call this from server - Add a Nonce */
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        entrants.length
                    )
                )
            );
    }

    function enterSweepstake() public payable {
        /* Minimum event to enter */
        require(msg.value > .01 ether);
        /* Check not entered competion already */
        require(entrantsThisRound[msg.sender] == false);
        /* Set mapping of entrantsThisRound to enter player */
        entrantsThisRound[msg.sender] = true;
        /* Push player into current round */
        entrants.push(msg.sender);
    }

    function pickWinner() public restricted {
        /* Get a random number based on number of entrants */
        uint256 index = random() % entrants.length;
        /* Cheese winner from array */
        address winner = entrants[index];

        /* Simple test of 1 % to owner and winners to winner */
        payable(owner).transfer((address(this).balance * 1) / 100);
        payable(winner).transfer((address(this).balance * 99) / 100);

        /* Clear entrant map and reset all players to false */
        for (uint256 i = 0; i < entrants.length; i++) {
            entrantsThisRound[entrants[i]] = false;
        }
        /* Clear array of current entrants */
        entrants = new address[](0);
    }

    function getCurrentEntrants() public view returns (address[] memory) {
        return entrants;
    }

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }
}
