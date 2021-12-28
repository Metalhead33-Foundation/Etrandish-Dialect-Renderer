// Consonants
const nasals = ["m", "n", "ɲ", "ŋ"];
const voiceless_plosives = ["p", "t", "t͡s", "t͡ʃ", "k"];
const voiced_plosives = ["b", "d", "d͡ʒ", "g"];
const plosives = voiceless_plosives.concat(voiced_plosives);
const voiceless_fricatives = ["f", "θ", "s", "ʃ", "h"];
const voiced_fricatives = ["v", "ð", "z" ];
const fricatives = voiceless_fricatives.concat(voiced_fricatives);
const approximants = ["l", "r", "j", "w" ];
const voiceless_obstrudents = voiceless_plosives.concat(voiceless_fricatives);
const voiced_obstrudents = voiced_plosives.concat(voiced_fricatives);
const obstrudents = voiceless_obstrudents.concat(voiced_obstrudents);
const consonants = obstrudents.concat(approximants, nasals);
const phonemic_vowels = ["ɑ", "ɛ", "œ", "e", "ø", "o", "ɪ", "ʏ", "ʊ", "i", "y", "u"];
const liquids = approximants.concat(phonemic_vowels, nasals, ["ː"]);
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
  ["h", "h"]
])
const voiced_to_voiceless_obs = new Map([
  ["b", "p"],
  ["v", "f"],
  ["d", "t"],
  ["d͡z", "t͡s"],
  ["d͡ʒ", "t͡ʃ"],
  ["z", "s"],
  ["ð", "θ"],
  ["g", "k"],
  ["h", "h"]
])

function regExpEscape(literal_string) {
    return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

function setText(text) {
	text = text.replace(new RegExp(' ','g'),'‿') + " "
	text = text.replace(new RegExp(regExpEscape(',‿'),'g'),'. ');
	text = text.replace(new RegExp(regExpEscape('.‿'),'g'),', ');
	text = text.replace(new RegExp(regExpEscape('!‿'),'g'),'! ');
	text = text.replace(new RegExp(regExpEscape('?‿'),'g'),'? ');
	phonemes.forEach(function(element) {
		text = text.replace(new RegExp(element+element),element+"ː");
	});
	// Harmonize consonant clusters
	for (let i = 0; i < 4; i++) {
		voiceless_obstrudents.forEach(function(elementA) {
			voiced_obstrudents.forEach(function(elementB) {
			text = text.replace(new RegExp(elementA+elementB,'g'),voiceless_to_voiced_obs.get(elementA)+elementB);
			text = text.replace(new RegExp(elementA+"‿"+elementB,'g'),voiceless_to_voiced_obs.get(elementA)+"‿"+elementB);
			});
		});
		voiced_obstrudents.forEach(function(elementA) {
			voiceless_obstrudents.forEach(function(elementB) {
			text = text.replace(new RegExp(elementA+elementB,'g'),voiced_to_voiceless_obs.get(elementA)+elementB);
			text = text.replace(new RegExp(elementA+"‿"+elementB,'g'),voiced_to_voiceless_obs.get(elementA)+"‿"+elementB);
			});
		});
	}
	// Process voiceless stops
	voiceless_plosives.forEach(function(elementA) {
		liquids.forEach(function(elementB) {
		text = text.replace(new RegExp(elementA+elementB,'g'),elementA+"ʰ"+elementB);
		text = text.replace(new RegExp(elementA+"‿"+elementB,'g'),elementA+"ʰ‿"+elementB);
		});
	});
	voiceless_plosives.forEach(function(elementA) {
		obstrudents.forEach(function(elementB) {
		text = text.replace(new RegExp(elementA+elementB,'g'),elementA+"̚"+elementB);
		text = text.replace(new RegExp(elementA+"‿"+elementB,'g'),elementA+"̚‿"+elementB);
		});
	});
	voiceless_plosives.forEach(function(element) {
		text = text.replace(new RegExp("s"+element+"ʰ",'g'),"s"+element);
		text = text.replace(new RegExp("s‿"+element+"ʰ",'g'),"s‿"+element);
	});
	voiceless_plosives.forEach(function(element) {
		text = text.replace(new RegExp(element+"ʰː",'g'),element+"̚."+element+"ʰ");
		text = text.replace(new RegExp(element+"ʰ"+element,'g'),element+"̚‿"+element+"ʰ");
	});
	voiceless_plosives.forEach(function(elementA) {
		liquids.forEach(function(elementB) {
		text = text.replace(new RegExp(elementA+elementB,'g'),elementA+"ʰ"+elementB);
		text = text.replace(new RegExp(elementA+"‿"+elementB,'g'),elementA+"ʰ‿"+elementB);
		});
	});
	return text;
}
function modifyText() {
	document.getElementById("outputtext").value = setText(document.getElementById("inputtext").value);
}
function uvularRSelect1() {
	if(document.getElementById("northern_r_select1").value === "type_a") {
		document.getElementById("uvular_r_final").hidden = false;
	} else {
		document.getElementById("uvular_r_final").hidden = true;
	}
}
function rhoticSelected() {
	if(document.getElementById("southern_rhotic_select").checked) {
		document.getElementById("alveolar_r_final").hidden = false;
	} else {
		document.getElementById("alveolar_r_final").hidden = true;
	}
}
function dialectSelected() {
	const selected_dialect = document.getElementById("dialect_select").value;
	document.getElementById("uvular_r_init").hidden = true;
	document.getElementById("uvular_r_final").hidden = true;
	document.getElementById("alveolar_r_final").hidden = true;
	document.getElementById("southern_rhotic").hidden = true;
	document.getElementById("eastern_rhotic").hidden = true;
	switch(document.getElementById("dialect_select").value) {
		case "dial_north":
			document.getElementById("uvular_r_init").hidden = false;
			uvularRSelect1();
			break;
		case "dial_standard":
			document.getElementById("alveolar_r_final").hidden = false;
			break;
		case "dial_south":
			document.getElementById("southern_rhotic").hidden = false;
			rhoticSelected();
			break;
		case "dial_east": // fall-through
		case "dial_copp": // fall-through
		case "dial_mnt"
			document.getElementById("eastern_rhotic").hidden = false;
			break;
		default:
			break;
	}
}
dialectSelected();
