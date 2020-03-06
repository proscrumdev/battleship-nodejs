Feature: IsShipValid
	In order to avoid cheeting
	As a player
	I want to be notified if my ship has a invalid placement

@debug
Scenario: Valid ship placement
	Given I have a 5 ship with 5 positions
	When I check if the ship is valid
	Then the result should be "true"

@debug
Scenario: Invalid ship placement
	Given I have a 5 ship with 4 positions
	When I check if the ship is valid
	Then the result should be "false"