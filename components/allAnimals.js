/*
React Hierarchy for this Application

Animal App
	All Animals
		Animal Card

*/

import React from "react";
import AnimalCard from './animalCard.js';


function AllAnimals(props){
	
	var animal = props.animals.map(function(item){
			return <AnimalCard key={item._id}
							   id={item._id}
							   name={item.name}
							   color={item.color}
							   age={item.age}
							   species={item.species} 
							   gender={item.gender}
							   image={item.image}
							   price={item.price}
							   getId={ props.getId }
							   deleteAnimal={ props.deleteAnimal }
							   />
		});

		return (
			<div>
				{animal}
			</div>
			
			)

};


module.exports = AllAnimals;