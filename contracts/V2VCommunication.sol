// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract V2VCommunication {
    struct Message {
        address sender;
        string content;
    }

    mapping(uint256 => Message[]) private messages;

    event MessageSent(uint256 indexed messageId, address indexed sender, string content);

    function sendMessage(uint256 messageId, string memory content) public {
        messages[messageId].push(Message(msg.sender, content));
        emit MessageSent(messageId, msg.sender, content);
    }

    function getMessageCount(uint256 messageId) public view returns (uint256) {
        return messages[messageId].length;
    }

    function getMessage(uint256 messageId, uint256 index) public view returns (address, string memory) {
        require(index < messages[messageId].length, "Index out of bounds");
        Message memory message = messages[messageId][index];
        return (message.sender, message.content);
    }
}
