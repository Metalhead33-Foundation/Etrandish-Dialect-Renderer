// Consonants
let initialgeminate_r = "";
let medial_r = "";
let final_r = "";
let voiceless_r = "";
let syllabic_r = "";

// const retroflex = ["r", "ɳ", "ʈ", "ɖ", "ʂ", "ʐ", "ɭ"];
const nasals = ["m", "n", "ɲ", "ŋ", "ɳ"];
const voiceless_plosives = ["p", "t", "ʈ", "t͡s", "t͡ʃ", "k", "c", "t͡ɕ"];
const voiced_plosives = ["b", "d", "ɖ", "d͡ʒ", "g", "ɟ", "d͡ʑ"];
const plosives = voiceless_plosives.concat(voiced_plosives);
const voiceless_fricatives = ["f", "θ", "s", "ʃ", "h", "x", "ç", "ɕ"];
const voiced_fricatives = ["v", "ð", "z", "ʒ", "ɦ", "ɣ", "ʝ", "ʑ", "ʐ", ];
const fricatives = voiceless_fricatives.concat(voiced_fricatives);
const approximants = ["l", "r", "j", "w", "ɭ" ];
const voiceless_obstrudents = voiceless_plosives.concat(voiceless_fricatives);
const voiced_obstrudents = voiced_plosives.concat(voiced_fricatives);
const obstrudents = voiceless_obstrudents.concat(voiced_obstrudents);
const consonants = obstrudents.concat(approximants, nasals);
const non_r_consonants = obstrudents.concat(nasals, ["l"]);
const front_vowels = ["ɛ", "œ", "e", "ø", "ɪ", "ʏ", "i", "y" ];
const back_vowels = ["ɑ", "ɐ", "a", "ə", "ɔ", "o", "ʊ", "u"];
const phonemic_vowels = back_vowels.concat(front_vowels);
const liquids = approximants.concat(phonemic_vowels, ["ː"]);
const liquids_n_nasals = liquids.concat(nasals);
const phonemes = consonants.concat(phonemic_vowels);

const word_boundary_indicators = [ " ", ",", ".", "\n", "\r", "?", "!" ];
const unreleased_after = word_boundary_indicators.concat(obstrudents);
const voiceless_to_voiced_obs = new Map([
  ["p", "b"],
  ["f", "v"],
  ["t", "d"],
  ["t͡s", "d͡z"],
  ["t͡ʃ", "d͡ʒ"],
  ["s", "z"],
  ["θ", "ð"],
  ["k", "g"],
  ["h", "ɦ"],
  ["ʃ", "ʒ"],
  ["x", "ɣ"],
  ["ç", "ʝ"],
  ["c", "ɟ"],
  ["ɕ", "ʑ"],
  ["t͡ɕ", "d͡ʑ"],
  ["ʈ", "ɖ"], ["ʂ", "ʐ"], ["ʈ͡ʂ", "ɖ͡ʐ"]
]);
const voiced_to_voiceless_obs = new Map([
  ["b", "p"],
  ["v", "f"],
  ["d", "t"],
  ["d͡z", "t͡s"],
  ["d͡ʒ", "t͡ʃ"],
  ["z", "s"],
  ["ð", "θ"],
  ["g", "k"],
  ["ɦ", "h"],
  ["ʒ", "ʃ"],
  ["ɣ", "x"],
  ["ʝ", "ç"],
  ["ɟ", "c"],
  ["ʑ", "ɕ"],
  ["d͡ʑ", "t͡ɕ"],
  ["ɖ", "ʈ"], ["ʐ", "ʂ"], ["ɖ͡ʐ", "ʈ͡ʂ"]
]);
const voiced_to_devoiced_obs = new Map([
  ["b", "b̥"],
  ["v", "v"],
  ["d", "d̥"],
  ["d͡z", "d̥͡z"],
  ["d͡ʒ", "d̥͡ʒ"],
  ["z", "z"],
  ["ð", "ð"],
  ["g", "g̊"],
  ["ɦ", "ɦ"],
  ["ʒ", "ʒ"],
  ["ɣ", "ɣ"],
  ["ʝ", "ʝ"],
  ["ɟ", "ɟ̊"],
  ["ʑ", "ʑ"],
  ["d͡ʑ", "d̥͡ʑ"],
  ["ɖ", "ɖ̥"], ["ʐ", "ʐ"], ["ɖ͡ʐ", "ɖ̥͡ʐ"]
]);

const dental = ["n", "t", "d", "s", "z", "l"];
const retroflex = ["r", "ɳ", "ʈ", "ɖ", "ʂ", "ʐ", "ɭ"];
const dental_to_retroflex = new Map([
  ["n", "ɳ"],
  ["t", "ʈ"],
  ["d", "ɖ"],
  ["s", "ʂ"],
  ["z", "ʐ"],
  ["l", "ɭ"]
]);

function regExpEscape(literal_string) {
    return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

function setText(text) {
	const selected_dialect = document.getElementById("dialect_select").value;
	const uvular_type_1 = document.getElementById("northern_r_select1").value;
	const uvular_type_2 = document.getElementById("northern_r_select2").value;
	const alveolar_type = document.getElementById("alveolar_r_final_select").value;
	const eastern_type = document.getElementById("eastern_rhotic_select").value;
	const palatalization_type = document.getElementById("eastern_palatalization_select").value;
	const isRhotic = (selected_dialect === "dial_south") ? document.getElementById("southern_rhotic_select").checked : true;
	let replacements = [];
	function addReplace(pattern,newtext) {
		replacements.push( [ new RegExp(regExpEscape(pattern),'g'),newtext] );
	}
	text = " " + text.replace(new RegExp(' ','g'),'‿') + " ";
	addReplace(',‿',' . ');
	addReplace('.‿',' , ');
	addReplace('!‿',' ! ');
	addReplace('?‿',' ? ');
	// Process some commonly used consonants
	addReplace("č","t͡ʃ");
	addReplace("š","ʃ");
	addReplace("dž","d͡ʒ");
	addReplace("ž","ʒ");
	// A bit of vowel processing
	addReplace("a","ɑ");
	addReplace("e","ɛ");
	addReplace("o","ɔ");
	addReplace("ø","œ");
	addReplace("ö","œ");
	addReplace("i","ɪ");
	addReplace("ü","ʏ");
	addReplace("y","ʏ");
	addReplace("u","ʊ");
	addReplace("j ","ɪ ");
	addReplace("j‿","ɪ‿");
	addReplace("ɥ ","ʏ ");
	addReplace("ɥ‿","ʏ‿");
	addReplace("w ","ʊ ");
	addReplace("w‿","ʊ‿");
	consonants.forEach(function(element){
		addReplace("j"+element,"ɪ"+element);
		addReplace("ɥ"+element,"ʏ"+element);
		addReplace("w"+element,"ʊ"+element);
	});
	phonemes.forEach(function(element) {
		addReplace(element+element,element+"ː");
	});
	addReplace("ɑː","aː");
	addReplace("ɛː","eː");
	addReplace("ɔː","oː");
	addReplace("œː","øː");
	addReplace("ɪː","iː");
	addReplace("ʏː","yː");
	addReplace("ʊː","uː");
	if(selected_dialect === "dial_scaur") {
		
	} else {
		addReplace("ɛɪ","eɪ");
		addReplace("œʏ","øʏ");
		addReplace("ɔʊ","oʊ");
	}
	addReplace("eː","eɪ");
	addReplace("øː","øʏ");
	addReplace("oː","oʊ");
	addReplace("ɑɪ","ɐɪ");
	addReplace("ɑʊ","ɐʊ");
	if(selected_dialect === "dial_copp") {
		addReplace("t͡ʃ","t͡ɕ");
		addReplace("d͡ʒ","d͡ʑ");
		addReplace("ʃ","ɕ");
		addReplace("ʒ","ʑ");
	} else if(selected_dialect === "dial_mnt") {
		addReplace("t͡ʃ","ʈ͡ʂ");
		addReplace("d͡ʒ","ɖ͡ʐ");
		addReplace("ʃ","ʂ");
		addReplace("ʒ","ʐ");
	}
	
	// Do H
	phonemic_vowels.forEach(function(vowel1) {
		phonemic_vowels.forEach(function(vowel2) {
		addReplace(vowel1+"h"+vowel2,vowel1+"ɦ"+vowel2);
		addReplace(vowel1+"h‿"+vowel2,vowel1+"ɦ‿"+vowel2);
		addReplace(vowel1+"‿h"+vowel2,vowel1+"‿ɦ"+vowel2);
		});
	});
	["r","l"].forEach(function(vowel) {
		addReplace(vowel+"h ",vowel+"x ");
		consonants.forEach(function(consonant) {
		addReplace(vowel+"h"+consonant,vowel+"x"+consonant);
		});
	});
	back_vowels.forEach(function(vowel) {
		addReplace(vowel+"h ",vowel+"x ");
		consonants.forEach(function(consonant) {
		addReplace(vowel+"h"+consonant,vowel+"x"+consonant);
		});
	});
	front_vowels.forEach(function(vowel) {
		addReplace(vowel+"h ",vowel+"ç ");
		consonants.forEach(function(consonant) {
		addReplace(vowel+"h"+consonant,vowel+"ç"+consonant);
		});
	});
	// Lenitions
	if(selected_dialect === "dial_east") {
		liquids.forEach(function(element){
			// B
			addReplace(element+"b",element+"β");
			addReplace(element+"‿b",element+"‿β");
			// G
			addReplace(element+"g",element+"ɣ");
			addReplace(element+"‿g",element+"‿ɣ");
		});
	}
	if(selected_dialect === "dial_mnt") {
		phonemic_vowels.forEach(function(vowel1){
		phonemic_vowels.forEach(function(vowel2){
			// B
			addReplace(vowel1+"b"+vowel2,vowel1+"β"+vowel2);
			addReplace(vowel1+"ːb"+vowel2,vowel1+"ːβ"+vowel2);
			addReplace(vowel1+"‿b"+vowel2,vowel1+"‿β"+vowel2);
			addReplace(vowel1+"ː‿bː"+vowel2,vowel1+"ː‿β"+vowel2);
			addReplace(vowel1+"b‿"+vowel2,vowel1+"β‿"+vowel2);
			addReplace(vowel1+"ːb‿ː"+vowel2,vowel1+"ːβ‿"+vowel2);
		});
		});
	}
	if(selected_dialect === "dial_north" || selected_dialect === "dial_scaur" || selected_dialect === "dial_standard") {
		
	} else if(selected_dialect === "dial_mnt") {
		front_vowels.forEach(function(vowel){
			// Ungeminated
			addReplace("n"+vowel,"nʲ"+vowel);
			addReplace("t"+vowel,"tʲ"+vowel);
			addReplace("d"+vowel,"dʲ"+vowel);
			addReplace("l"+vowel,"lʲ"+vowel);
			addReplace("s"+vowel,"sʲ"+vowel);
			addReplace("z"+vowel,"zʲ"+vowel);
			// Geminated
			addReplace("nː"+vowel,"nʲː"+vowel);
			addReplace("tː"+vowel,"tʲː"+vowel);
			addReplace("dː"+vowel,"dʲː"+vowel);
			addReplace("lː"+vowel,"lʲː"+vowel);
			addReplace("sː"+vowel,"sʲː"+vowel);
			addReplace("zː"+vowel,"zʲː"+vowel);
		});
		addReplace("θ","t");
		addReplace("ð","d");
	} else if(selected_dialect === "dial_west") {
		addReplace("ð","d");
		liquids.forEach(function(element){
			// D
			addReplace(element+"d",element+"ð");
			addReplace(element+"‿d",element+"‿ð");
		});
	} else if(selected_dialect === "dial_copp") {
		for (let i = 0; i < 4; i++) {
			retroflex.forEach(function(element1){
			dental.forEach(function(element2){
				addReplace(element1+element2,element1+dental_to_retroflex.get(element2));
			});			
			});
		}
		addReplace("θ","f");
		addReplace("ð","d");
	} else {
		addReplace("θ","f");
		addReplace("ð","d");
		liquids.forEach(function(element){
			// D
			addReplace(element+"d",element+"ð");
			addReplace(element+"‿d",element+"‿ð");
		});
	}
	switch(palatalization_type) {
		default: // Fall-through
		case "palatal_1":
			break;
		case "palatal_2":
			addReplace("nʲ","ɲ");
			addReplace("lʲ","ʎ");
			addReplace("tʲ","c");
			addReplace("dʲ","ɟ");
			//addReplace("sʲ","ɕ");
			//addReplace("zʲ","ʑ");
			break;
		case "palatal_3":
			addReplace("nʲ","ɲ");
			addReplace("lʲ","ʎ");
			addReplace("tʲ","t͡ɕ");
			addReplace("dʲ","d͡ʑ");
			addReplace("sʲ","ɕ");
			addReplace("zʲ","ʑ");
			break;
	}
	// Harmonize consonant clusters
	for (let i = 0; i < 4; i++) {
		voiceless_obstrudents.forEach(function(elementA) {
			voiced_obstrudents.forEach(function(elementB) {
			addReplace(elementA+elementB,voiceless_to_voiced_obs.get(elementA)+elementB);
			addReplace(elementA+"‿"+elementB,voiceless_to_voiced_obs.get(elementA)+"‿"+elementB);
			});
		});
		voiced_obstrudents.forEach(function(elementA) {
			voiceless_obstrudents.forEach(function(elementB) {
			addReplace(elementA+elementB,voiced_to_voiceless_obs.get(elementA)+elementB);
			addReplace(elementA+"‿"+elementB,voiced_to_voiceless_obs.get(elementA)+"‿"+elementB);
			});
		});
	}
	// Process voiceless stops
	if(selected_dialect === "dial_south") { } else {
		voiceless_plosives.forEach(function(elementA) {
			liquids_n_nasals.forEach(function(elementB) {
			addReplace(elementA+elementB,elementA+"ʰ"+elementB);
			addReplace(elementA+"‿"+elementB,elementA+"ʰ‿"+elementB);
			});
		});
	}
	addReplace("t͡sʰː","t̚.t͡sʰ");
	addReplace("t͡ʃʰː","t̚.t͡ʃʰ");
	addReplace("t͡ɕʰː","t̚.t͡ɕʰ");
	addReplace("ʈʂʰː","ʈ̚.ʈʂʰ");
	voiceless_plosives.forEach(function(elementA) {
		obstrudents.forEach(function(elementB) {
		addReplace(elementA+elementB,elementA+"̚"+elementB);
		addReplace(elementA+"‿"+elementB,elementA+"̚‿"+elementB);
		});
	});
	voiceless_plosives.forEach(function(element) {
		addReplace("s"+element+"ʰ","s"+element);
		addReplace("s‿"+element+"ʰ","s‿"+element);
	});
	voiceless_plosives.forEach(function(element) {
		addReplace(element+"ʰː",element+"̚."+element+"ʰ");
		addReplace(element+"ʰ"+element,element+"̚‿"+element+"ʰ");
	});
	
	// Devoicings
	addReplace("ʰl","l̥");
	addReplace("ʰn","n̥");
	addReplace("ʰm","m̥");
	addReplace("ʰj","ç");
	addReplace("ʰw","ʍ");
	if(selected_dialect === "dial_north" || selected_dialect === "dial_mnt") {
		voiced_plosives.forEach(function(element){
			addReplace(" "+element, " "+voiced_to_voiceless_obs.get(element));
			addReplace(element+" ", voiced_to_voiceless_obs.get(element)+" " );
		});
	} else {
		if(selected_dialect === "dial_copp") {
		voiceless_plosives.forEach(function(element){
			addReplace(element+" ", voiceless_to_voiced_obs.get(element)+" " );
		});
		}
		if(selected_dialect === "dial_south") {
			
		} else {
		voiced_plosives.forEach(function(element){
			addReplace(" "+element, " "+voiced_to_devoiced_obs.get(element));
			addReplace(element+" ", voiced_to_devoiced_obs.get(element)+" " );
		});
		}
	}
	// Rhotics
	addReplace("ɐʊr ","ɔːr ");
	addReplace("ɐɪr ","ɛːr ");
	addReplace("ɐʊl ","ɔːl ");
	addReplace("ɐɪl ","ɛːl ");
	consonants.forEach(function(element) {
		addReplace("ɐʊr"+element,"ɔːr"+element);
		addReplace("ɐɪr"+element,"ɛːr"+element);
		addReplace("ɐʊr‿"+element,"ɔːr‿"+element);
		addReplace("ɐɪr‿"+element,"ɛːr‿"+element);
		addReplace("ɐʊl"+element,"ɔːl"+element);
		addReplace("ɐɪl"+element,"ɛːl"+element);
		addReplace("ɐʊl‿"+element,"ɔːl‿"+element);
		addReplace("ɐɪl‿"+element,"ɛːl‿"+element);
	});
	if(selected_dialect === "dial_north" && uvular_type_1 === "type_a") {
		phonemic_vowels.forEach(function(element){
		addReplace(element+"ːɑr ",element+"ːr ");
		addReplace(element+"ɑr ",element+"r ");
		non_r_consonants.forEach(function(consonant){
		addReplace(element+"ːɑr"+consonant,element+"ːr"+consonant);
		addReplace(element+"ɑr"+consonant,element+"r"+consonant);
		});
		});
	} else {
		phonemic_vowels.forEach(function(element){
		addReplace(element+"ːɑr ",element+"ːɛr ");
		addReplace(element+"ɑr ",element+"ɛr ");
		non_r_consonants.forEach(function(consonant){
		addReplace(element+"ːɑr"+consonant,element+"ːɛr"+consonant);
		addReplace(element+"ɑr"+consonant,element+"ɛr"+consonant);
		});
		});
	}
	addReplace("ɑr ","ɒr ");
	addReplace("aːr ","ɔːr ");
	if(selected_dialect === "dial_north" && uvular_type_1 === "type_a") {
		addReplace("iːr ","ɪr ");
		addReplace("yːr ","ʏr ");
		addReplace("uːr ","ʊr ");
	} else {
		addReplace("iːr ","ɪɛr ");
		addReplace("yːr ","ʏɛr ");
		addReplace("uːr ","ʊɛr ");
	}
	non_r_consonants.forEach(function(element) {
		addReplace("ɑr"+element,"ɒr"+element);
		addReplace("ɑr"+"‿"+element,"ɒr‿"+element);
		addReplace("aːr"+element,"ɔːr"+element);
		addReplace("aːr"+"‿"+element,"ɔːr‿"+element);
		if(selected_dialect === "dial_north" && uvular_type_1 === "type_a") {
			addReplace("iːr"+element,"ɪr"+element);
			addReplace("iːr"+"‿"+element,"ɪr‿"+element);
			addReplace("yːr"+element,"ʏr"+element);
			addReplace("yːr"+"‿"+element,"ʏr‿"+element);
			addReplace("uːr"+element,"ʊr"+element);
			addReplace("uːr"+"‿"+element,"ʊr‿"+element);
		} else {
			addReplace("iːr"+element,"ɪɛr"+element);
			addReplace("iːr"+"‿"+element,"ɪɛr‿"+element);
			addReplace("yːr"+element,"ʏɛr"+element);
			addReplace("yːr"+"‿"+element,"ʏɛr‿"+element);
			addReplace("uːr"+element,"ʊɛr"+element);
			addReplace("uːr"+"‿"+element,"ʊɛr‿"+element);
		}
	});
	addReplace("r", medial_r);	
	addReplace(" "+medial_r," " + initialgeminate_r);	
	addReplace(medial_r+"‿"+medial_r,initialgeminate_r+"‿"+initialgeminate_r);
	addReplace(medial_r+"ː",initialgeminate_r+"ː");
	addReplace("ə"+medial_r+" ",syllabic_r+" ");
	addReplace("ɛ"+medial_r+" ",syllabic_r+" ");
	addReplace("œ"+medial_r+" ",syllabic_r+" ");
	non_r_consonants.forEach(function(element) {
		addReplace("ə"+medial_r+element,syllabic_r+element);
		addReplace("ə"+medial_r+"‿"+element,syllabic_r+"‿"+element);
		addReplace("ɛ"+medial_r+element,syllabic_r+element);
		addReplace("ɛ"+medial_r+"‿"+element,syllabic_r+"‿"+element);
		addReplace("œ"+medial_r+element,syllabic_r+element);
		addReplace("œ"+medial_r+"‿"+element,syllabic_r+"‿"+element);
	});
	if( !(selected_dialect === "dial_north" || selected_dialect === "dial_scaur") ) {
		addReplace("ɪ"+medial_r+" ",syllabic_r+" ");
		addReplace("ʏ"+medial_r+" ",syllabic_r+" ");
		addReplace("ʊ"+medial_r+" ",syllabic_r+" ");
		non_r_consonants.forEach(function(element) {
			addReplace("ɪ"+medial_r+element,syllabic_r+element);
			addReplace("ɪ"+medial_r+"‿"+element,syllabic_r+"‿"+element);
			addReplace("ʏ"+medial_r+element,syllabic_r+element);
			addReplace("ʏ"+medial_r+"‿"+element,syllabic_r+"‿"+element);
			addReplace("ʊ"+medial_r+element,syllabic_r+element);
			addReplace("ʊ"+medial_r+"‿"+element,syllabic_r+"‿"+element);
		});
	}
	addReplace(medial_r+" ",final_r+" ");
	non_r_consonants.forEach(function(element) {
		addReplace(medial_r+element,final_r+element);
		addReplace(medial_r+"‿"+element,final_r+"‿"+element);
	});
	voiceless_obstrudents.forEach(function(element){
		addReplace(element+medial_r,element+initialgeminate_r);
		addReplace(element+"‿"+medial_r,element+"‿"+initialgeminate_r);
	});
	nasals.forEach(function(element){
		addReplace(element+"‿"+medial_r,element+"‿"+initialgeminate_r);
	});
	approximants.forEach(function(element){
		addReplace(element+"‿"+medial_r,element+"‿"+initialgeminate_r);
	});
	addReplace("ʰ"+medial_r,voiceless_r);
	addReplace("ɜː ","ə ");
	addReplace("ɜː‿","ə‿");
	phonemic_vowels.forEach(function(element){
	addReplace(element+"ːɜː",element+"ə");
	addReplace(element+"ɜː",element+"ə");
	});
	addReplace("ɑ ","ɐ ");
	addReplace("ɑ‿","ɐ‿");
	phonemic_vowels.forEach(function(element){
	addReplace(element+"ɑː",element+"ɐ");
	addReplace(element+"ɑ",element+"ɐ");
	});		
	// Diphthongs
	phonemic_vowels.forEach(function(vow){
		addReplace(vow+"ɪ ",vow+"ɪ̯ ");
		addReplace(vow+"ɪ‿",vow+"ɪ̯‿");
		addReplace(vow+"ʏ ",vow+"ʏ̯ ");
		addReplace(vow+"ʏ‿",vow+"ʏ̯‿");
		addReplace(vow+"ʊ ",vow+"ʊ̯ ");
		addReplace(vow+"ʊ‿",vow+"ʊ̯‿");
		consonants.forEach(function(element){
			addReplace(vow+"ɪ"+element,vow+"ɪ̯"+element);
			addReplace(vow+"ʏ"+element,vow+"ʏ̯"+element);
			addReplace(vow+"ʊ"+element,vow+"ʊ̯"+element);
		});
	});
	// Do L
	if(selected_dialect === "dial_south") {
		addReplace("l ","ʊ̯ ");
		consonants.forEach(function(element){
			addReplace("l"+element,"ʊ̯"+element);
			addReplace("l‿"+element,"ʊ̯‿"+element);
		});
		addReplace("l","ł");
		addReplace("ʏ̯ʊ̯","ʊ̯");
		addReplace("ɪ̯ʊ̯","ʊ̯");
		addReplace("ʊ̯ʊ̯","ʊ̯");
	} else {
		addReplace("l ","ł ");
		consonants.forEach(function(element){
			addReplace("l"+element,"ł"+element);
			addReplace("l‿"+element,"ł‿"+element);
		});
	}	
	// Other stuff
	addReplace("ːː","ː");
	addReplace("ːˤː","ˤː");
	console.log("Evaluating " + replacements.length + " replacements.");
	replacements.forEach(function(element) {
		//console.log("Pattern: " + element[0].toString() + "\nReplacement: " + element[1]);
		text = text.replace(element[0],element[1]);
	});	
	return text;
}
function modifyText() {
	document.getElementById("outputtext").value = setText(document.getElementById("inputtext").value);
}
/*
    <option value="type_r1">[ɹ̠ˠ] Velarized post-alveolar approximant</option>
    <option value="type_r2">[ɹ̠ˤ] Pharyngealized post-alveolar approximant</option>
    <option value="type_r3">[ɻˠ] Velarized retroflex approximant</option>
    <option value="type_r4">[ɻˤ] Pharyngealized retroflex approximant</option>
    <option value="type_r5">[V˞ˤ] R-colouring and pharyngealization of the previous vowel</option>
 */

function updateRhoticType() {
	const selected_dialect = document.getElementById("dialect_select").value;
	const uvular_type_1 = document.getElementById("northern_r_select1").value;
	const uvular_type_2 = document.getElementById("northern_r_select2").value;
	const alveolar_type = document.getElementById("alveolar_r_final_select").value;
	const eastern_type = document.getElementById("eastern_rhotic_select").value;
	const isRhotic = (selected_dialect === "dial_south") ? document.getElementById("southern_rhotic_select").checked : true;
	switch(selected_dialect) {
		default:
		case "dial_west": {
				initialgeminate_r = "r̠";
				medial_r = "ɾ̠";
				voiceless_r = "r̠̥";
				final_r = medial_r;
				syllabic_r = "ə" + final_r;
				break;
				}
		case "dial_east": {
				switch(eastern_type) {
					default:
					case "type_a":
						initialgeminate_r = "r̠";
						voiceless_r = "r̠̥";
						break;
					case "type_b":
						initialgeminate_r = "ʀ";
						voiceless_r = "ʀ̥";
						break;
				}
				medial_r = "ɾ̠";
				final_r = medial_r;
				syllabic_r = "ə" + final_r;
				break;
				}
		case "dial_copp": {
				switch(eastern_type) {
					default:
					case "type_a":
						initialgeminate_r = "r̠";
						voiceless_r = "r̠̥";
						break;
					case "type_b":
						initialgeminate_r = "ʀ";
						voiceless_r = "ʀ̥";
						break;
				}
				medial_r = "ɽ";
				final_r = "ɻ";
				syllabic_r = "ə" + final_r;
				break;
				}
		case "dial_standard": {
				initialgeminate_r = "r̠";
				medial_r = "ɾ̠";
				voiceless_r = "r̠̥";
				switch(alveolar_type) {
					default:
					case "type_r1":
						final_r = "ɹ̠ˠ";
						syllabic_r = "ə" + final_r;
						break;
					case "type_r2":
						final_r = "ɹ̠ˤ";
						syllabic_r = "ə" + final_r;
						break;
					case "type_r3":
						final_r = "ɻˠ";
						syllabic_r = "ə" + final_r;
						break;
					case "type_r4":
						final_r = "ɻˤ";
						syllabic_r = "ə" + final_r;
						break;
					case "type_r5":
						final_r = "˞ˤ";
						syllabic_r = "ɚˤ";
						break;
				}
				break;
				}
		case "dial_south": {
				switch(alveolar_type) {
					default:
					case "type_r1":
						final_r = "ɹ̠ˠ";
						syllabic_r = "ə" + final_r;
						initialgeminate_r = final_r;
						medial_r = final_r;
						voiceless_r = final_r;
						break;
					case "type_r2":
						final_r = "ɹ̠ˤ";
						syllabic_r = "ə" + final_r;
						initialgeminate_r = final_r;
						medial_r = final_r;
						voiceless_r = final_r;
						break;
					case "type_r3":
						final_r = "ɻˠ";
						syllabic_r = "ə" + final_r;
						initialgeminate_r = final_r;
						medial_r = final_r;
						voiceless_r = final_r;
						break;
					case "type_r4":
						final_r = "ɻˤ";
						syllabic_r = "ə" + final_r;
						initialgeminate_r = final_r;
						medial_r = final_r;
						voiceless_r = final_r;
						break;
					case "type_r5":
						final_r = "˞ˤ";
						syllabic_r = "ɚˤ";
						initialgeminate_r = "ɹ̠ˠ";
						medial_r = initialgeminate_r;
						voiceless_r = initialgeminate_r;
						break;
				}
				if(!isRhotic) {
						syllabic_r = "ɜː";
						final_r = "ː";
				}
			break;
				}
		case "dial_north": {
				voiceless_r = "χ";
				switch(uvular_type_1) {
					default:
					case "type_a":
						initialgeminate_r = "ʀ";
						medial_r = "ʀ̆";
						syllabic_r = "ɐ"
						switch(uvular_type_2) {
							default:
							case "type_a1":
								final_r = "ʁ̞";
								break;
							case "type_a2":
								final_r = "ɐ̯";
								break;
							case "type_a3":
								final_r = "ˤː";
								break;
						}
						break;
					case "type_b":
						initialgeminate_r = "ʁ̝";
						medial_r = initialgeminate_r;
						final_r = initialgeminate_r;
						syllabic_r = "ə" + final_r;
						break;
				}
			break;
			}
		case "dial_mnt": {
			switch(eastern_type) {
				default:
				case "type_a":
					initialgeminate_r = "r̠";
					voiceless_r = "r̠̥";
					break;
				case "type_b":
					initialgeminate_r = "ʀ";
					voiceless_r = "ʀ̥";
					break;
			}
			medial_r = initialgeminate_r;
			final_r = initialgeminate_r;
			syllabic_r = "ə" + final_r;
			break;
			}
		case "dial_scaur": {
			initialgeminate_r = "ʀ";
			voiceless_r = "ʀ̥";
			medial_r = "ʀ̆";
			final_r = "ʁ̞";
			syllabic_r = "ə" + final_r;
			break;
			}
	}
}
function uvularRSelect1() {
	if(document.getElementById("northern_r_select1").value === "type_a") {
		document.getElementById("uvular_r_final").hidden = false;
	} else {
		document.getElementById("uvular_r_final").hidden = true;
	}
	updateRhoticType();
}
function rhoticSelected() {
	if(document.getElementById("southern_rhotic_select").checked) {
		document.getElementById("alveolar_r_final").hidden = false;
	} else {
		document.getElementById("alveolar_r_final").hidden = true;
	}
	updateRhoticType();
}
function dialectSelected() {
	const selected_dialect = document.getElementById("dialect_select").value;
	document.getElementById("uvular_r_init").hidden = true;
	document.getElementById("uvular_r_final").hidden = true;
	document.getElementById("alveolar_r_final").hidden = true;
	document.getElementById("southern_rhotic").hidden = true;
	document.getElementById("eastern_rhotic").hidden = true;
	document.getElementById("eastern_palatalization").hidden = true;
	switch(document.getElementById("dialect_select").value) {
		case "dial_north":
			document.getElementById("uvular_r_init").hidden = false;
			uvularRSelect1();
			break;
		case "dial_standard":
			document.getElementById("alveolar_r_final").hidden = false;
			updateRhoticType();
			break;
		case "dial_south":
			document.getElementById("southern_rhotic").hidden = false;
			rhoticSelected();
			break;
		case "dial_mnt": // fall-through
			document.getElementById("eastern_palatalization").hidden = false;
		case "dial_east": // fall-through
		case "dial_copp":
			document.getElementById("eastern_rhotic").hidden = false;
			updateRhoticType();
			break;
		default:
			updateRhoticType();
			break;
	}
}
dialectSelected();
