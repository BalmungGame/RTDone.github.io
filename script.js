const lib = JsonUrl('lzma');
const domdom = {
	newEleFromModel: function(element) {
		return element.cloneNode(true)
	},
	eleByID: function(id) {
		return document.getElementById(id)
	},
	rmByID: function(id) {
		let thisElement = document.getElementById(id)
		thisElement.parentNode.removeChild(thisElement)
	},
	eleByClass: function(classname) {
		return document.getElementsByClassName(classname)
	},
	eleBySelector: function(selector) {
		return document.querySelector(selector)
	},
	getAttributeValueByID: function(elementID, attribute) {
		let thisElement = document.getElementById(elementID)
		return thisElement.getAttribute(attribute)
	},
	updateTextByID: function(elementID, text) {
		text = text || ""
		let thisElement = document.getElementById(elementID)
		if (thisElement.innerHTML !== text.toString()) {
			thisElement.innerHTML = text.toString()
		}
	},
	updateTextBySelector: function(elementSelector, text) {
		text = text || ""
		let thisElement = document.querySelector(elementSelector)
		if (thisElement.innerHTML !== text.toString()) {
			thisElement.innerHTML = text.toString()
		}
	},
	updateAttributeByID: function(elementID, attribute, value) {
		let thisElement = document.getElementById(elementID)
		if (thisElement.getAttribute(attribute) !== value.toString()) {
			thisElement.setAttribute(attribute, value.toString())
		}
	},
	updateAttributeBySelector: function(elementSelector, attribute, value) {
		let thisElement = document.querySelector(elementSelector)
		if (thisElement.getAttribute(attribute) !== value.toString()) {
			thisElement.setAttribute(attribute, value.toString())
		}
	}
}

const toDecimal = (number, decimal) => {
	number = number || 0
	decimal = decimal || 0
	var dec = Math.pow(10,decimal)
	if (number === 0) { return 0 }
	return Math.round(number * dec) / dec
}

const txt = (textTemplate, valuesArray=undefined) => {
	let thisLocaleTemplate = textTemplate

	if (valuesArray !== undefined) {
		for (var i = 0; i < valuesArray.length; i++) {
			let replaceableLabel1 = "#"+i+"n#"
			let replaceableLabel2 = "#"+i+"d#"
			let replaceableLabel3 = "#"+i+"#"

			if (thisLocaleTemplate.indexOf(replaceableLabel1) !== -1) {
				while (thisLocaleTemplate.indexOf(replaceableLabel1) !== -1) {
					thisLocaleTemplate = thisLocaleTemplate.replace(replaceableLabel1, valuesArray[i].toLocaleString())
				}
			} else if (thisLocaleTemplate.indexOf(replaceableLabel2) !== -1) {
				while (thisLocaleTemplate.indexOf(replaceableLabel2) !== -1) {
					thisLocaleTemplate = thisLocaleTemplate.replace(replaceableLabel2, toDecimal(valuesArray[i],2))
				}
			} else {
				let replaceableLabel3 = "#"+i+"#"
				while (thisLocaleTemplate.indexOf(replaceableLabel3) !== -1) {
					thisLocaleTemplate = thisLocaleTemplate.replace(replaceableLabel3, valuesArray[i])
				}
			}
		}
	}
	
	return thisLocaleTemplate.toString()
}

const settings = {
	lang: "en",
	build: {
		w: {k: null, s: []},
		o: {k: null, s: []},
		h: {k: null, s: []},
		c: {k: null, s: []},
		f: {k: null, s: []},
		r1: {k: null, s: []},
		r2: {k: null, s: []},
		e: {k: null, s: []},
		n: {k: null, s: []},
		b: {k: null, s: []},
	},
	buildset: {

	},
	buildsetbonuseffects: {
		c: 0,
		l: 0,
		h: 0,
		i: 0,
		e: 0,
		m: 0,
	},
	url: "",
	notice: "",
	showstats: 0,
	showrand: 0,
	elr: "0" /*equip list rarity filter*/
}

const elementTemplates = {
	// setup sets
	setupSet : domdom.eleByID("setup-set-tmp"),
	setupSetPrefix : "setup-set-",

	// setup random attr
	setupRand : domdom.eleByID("setup-randomattributes-tmp"),
	setupRandPrefix : "setup-randomattributes-",
	setupRandSelect : domdom.eleByID("setup-randomattributes-tmp-rpe-select-tmp"),
	setupRandSelectPrefix : "rpe-select-",
	setupRandOption : domdom.eleByID("rpe-option-tmp"),
	setupRandOptionPrefix : "rpe-option-",


	// setup stats
	setupStat : domdom.eleByID("setup-stat-tmp"),
	setupStatPrefix : "setup-stat-",

	// equip list
	equipItemset : domdom.eleByID("equip-itemset-tmp"),
	equipItemsetPrefix : "equip-itemset-",

	seteffectvalue : "<p class=\"effect\">#0#</p>",
	fixedAttribute : domdom.eleByID("fixed-attribute-tmp"),
	fixedAttributePrefix : "fixed-attribute-",

}

function keyInfo(keyType, key) {
	if (keyType == "rtdstat") {

	} else if (keyType == "rtdstat") {

	} else if (keyType == "rtdeffect") {

	} else if (keyType == "rtdset") {
		return {
			rarity: key.slice(1,2),
			setid: key.slice(2,5),
		}
	} else if (keyType == "rtdequip") {
		return {
			rarity: key.slice(0,1),
			setid: key.slice(1,4),
			type: key.slice(4)
		}
	}
}


function initData() {
	// check if constants exist first
	if (typeof rtdstat == 'undefined') {
		throw "rtdstat not found!"
	}
	if (typeof rtdeffect == 'undefined') {
		throw "rtdeffect not found!"
	}
	if (typeof rtdset == 'undefined') {
		throw "rtdset not found!"
	}
	if (typeof rtdequip == 'undefined') {
		throw "rtdequip not found!"
	}

	// check if set is added, and assign item to sets
	for (let equipKey in rtdequip) {
		if (rtdequip[equipKey].hasOwnProperty("setid") == false) {
			throw "Equip with key '" + equipKey + "' doesn't have setid specified."
		}

		let setid = rtdequip[equipKey].setid

		if (rtdset.hasOwnProperty(setid) == false) {
			throw "There is no set with key '" + setid + "' in rtdset."
		}
		if (rtdset[setid].hasOwnProperty("items") == false) {
			rtdset[setid].items = []
		}
		rtdset[setid].items.push(equipKey)
	}

}

function initElements() {


	// remove tmp
	domdom.eleByID("rpe-option-tmp").remove()
	domdom.eleByID("setup-randomattributes-tmp-rpe-select-tmp").remove()

	domdom.eleByID("equip-itemset-tmp").remove()
	domdom.eleByID("setup-stat-tmp").remove()

	// add setup handlers
	document.getElementById("setup-w").onclick = function () {
		settings.build.w.k = null; 
		settings.build.w.s = [];
		calcSetupSet()
	}
	document.getElementById("setup-o").onclick = function () {
		settings.build.o.k = null; 
		settings.build.o.s = [];
		calcSetupSet()
	}
	document.getElementById("setup-h").onclick = function () {
		settings.build.h.k = null; 
		settings.build.h.s = [];
		calcSetupSet()
	}
	document.getElementById("setup-c").onclick = function () {
		settings.build.c.k = null; 
		settings.build.c.s = [];
		calcSetupSet()
	}
	document.getElementById("setup-f").onclick = function () {
		settings.build.f.k = null; 
		settings.build.f.s = [];
		calcSetupSet()
	}
	document.getElementById("setup-r1").onclick = function () {
		settings.build.r1.k = null; 
		settings.build.r1.s = [];
		calcSetupSet()
	}
	document.getElementById("setup-r2").onclick = function () {
		settings.build.r2.k = null; 
		settings.build.r2.s = [];
		calcSetupSet()
	}
	document.getElementById("setup-e").onclick = function () {
		settings.build.e.k = null; 
		settings.build.e.s = [];
		calcSetupSet()
	}
	document.getElementById("setup-n").onclick = function () {
		settings.build.n.k = null; 
		settings.build.n.s = [];
		calcSetupSet()
	}
	document.getElementById("setup-b").onclick = function () {
		settings.build.b.k = null; 
		settings.build.b.s = [];
		calcSetupSet()
	}
	removeSetupSetElement()

	document.getElementById("showstats").onclick = function () {
		settings.showstats = 1
	}
	document.getElementById("showequips").onclick = function () {
		settings.showstats = 0
	}


	// equip list color filter
	domdom.eleByID("eif-c").onclick = function () {if (settings.elr !== "c") {settings.elr = "c"} else {settings.elr = "0"}}
	domdom.eleByID("eif-l").onclick = function () {if (settings.elr !== "l") {settings.elr = "l"} else {settings.elr = "0"}}
	domdom.eleByID("eif-h").onclick = function () {if (settings.elr !== "h") {settings.elr = "h"} else {settings.elr = "0"}}
	domdom.eleByID("eif-i").onclick = function () {if (settings.elr !== "i") {settings.elr = "i"} else {settings.elr = "0"}}
	domdom.eleByID("eif-e").onclick = function () {if (settings.elr !== "e") {settings.elr = "e"} else {settings.elr = "0"}}

	// add all stats
	for (let statKey in rtdstat) {
		addSetupStatElement(statKey)
	}

	// equip item set list
	for (let setKey in rtdset) {
		if (rtdset[setKey].hasOwnProperty("items") == true && rtdset[setKey].items.length > 0) {
			addEquipItemsetElement(setKey)
		}
	}
}

function addSetupStatElement(statKey) {
	let newSetupStatElement = domdom.newEleFromModel(elementTemplates.setupStat)
	let newElementID = elementTemplates.setupStatPrefix + statKey
	newSetupStatElement.id = newElementID

	domdom.eleByID("setup-allstats").appendChild(newSetupStatElement)

	domdom.updateAttributeBySelector("#"+newElementID+" .stat-name", "id", newElementID+"-name")
	domdom.updateAttributeBySelector("#"+newElementID+" .stat-value", "id", newElementID+"-value")

	domdom.updateTextByID(newElementID+"-name", rtdstat[statKey].name[settings.lang])
	if(rtdstat[statKey].hasOwnProperty("unit") === false) {
		domdom.updateTextByID(newElementID+"-value", "")
	}
}

function updateSetupStatElement(statKey) {

	// collect all stats
	let allstats = {}

	for (let statKey in rtdstat) {
		if (rtdstat[statKey].hasOwnProperty("unit") === true) {
			allstats[statKey] = 0
		}
	}

	// calc from equip effects
	for (let slotKey in settings.build) {
		if (settings.build[slotKey].k !== null) {
			let equipKey = settings.build[slotKey].k

			if (rtdequip[equipKey].hasOwnProperty("effects") === true) {
				for (var see_i = 0; see_i < rtdequip[equipKey].effects.length; see_i++) {
					let seEffectKey = rtdequip[equipKey].effects[see_i][0]
					if (allstats.hasOwnProperty(seEffectKey) === true) {
						allstats[seEffectKey] += rtdequip[equipKey].effects[see_i][1]
					}
				}
			}

			// from special
			if (settings.build[slotKey].s.length > 0) {
				let slotItemSpecials = settings.build[slotKey].s

				for (let sis_i = 0; sis_i < slotItemSpecials.length; sis_i++) {
					let sEffectKey = slotItemSpecials[sis_i][0]
					if (allstats.hasOwnProperty(sEffectKey) === true) {
						allstats[sEffectKey] += slotItemSpecials[sis_i][1]
					}
				}
			}
		}
	}
	// calc from set effects
	for (let setKey in settings.buildset) {
		let totalMaxSet = settings.buildset[setKey].equips + settings.buildset[setKey].effects

		if (rtdset[setKey].hasOwnProperty("effects") === true) {
			let effectsObject = rtdset[setKey].effects

			for (let effectKey in effectsObject) {
				let seteffectcount = effectKey.slice(1)
				let description = ""

				if (seteffectcount <= totalMaxSet) {
					// loop through all effects
					for (let se_i = 0; se_i < effectsObject[effectKey].length; se_i++) {
						let effectData = [...effectsObject[effectKey][se_i]]
						let effectDataKey = effectData[0]
						if (effectDataKey.slice(0,1) == "s") {
							// its a basic stat
							if (allstats.hasOwnProperty(effectDataKey) === true){
								allstats[effectDataKey] += effectData[1]
							}
						}
					}
				}
			}
		}
	}
	
	// calc special effects
	// manticore
	if (settings.buildset.hasOwnProperty("se015") === true
		&& (settings.buildset.se015.equips + settings.buildset.se015.effects) >= 2) {
		allstats.s009 += allstats.s003
	}


	// update the elements
	for (let statKey in allstats) {
		let statvalue = allstats[statKey]
		let statValueElementID =  "setup-stat-"+statKey+"-value"
		let valuetext = rtdstat[statKey].unit[0] + statvalue + rtdstat[statKey].unit[1]
		domdom.updateTextByID(statValueElementID, valuetext)
		if (statvalue === 0) {
			domdom.updateAttributeByID("setup-stat-"+statKey, "data-show", 0)
		} else {
			domdom.updateAttributeByID("setup-stat-"+statKey, "data-show", 1)
		}
	}
}

function addEquipItemsetElement(setKey) {
	let newEquipItemsetElement = domdom.newEleFromModel(elementTemplates.equipItemset)
	let newElementID = elementTemplates.equipItemsetPrefix + setKey
	newEquipItemsetElement.id = newElementID
	let setKeyInfo = keyInfo("rtdset", setKey)

	domdom.eleByID("equip-itemset-list").appendChild(newEquipItemsetElement)

	domdom.updateAttributeByID(newElementID, "data-filter-rarity", setKeyInfo.rarity)

	domdom.updateAttributeBySelector("#"+newElementID+" .equip-itemset-name", "id", newElementID+"-name")
	domdom.updateAttributeBySelector("#"+newElementID+" .name", "id", newElementID+"-namename")
	domdom.updateAttributeBySelector("#"+newElementID+" .rarity", "id", newElementID+"-namerarity")

	// setname
	let newElementSetName = rtdset[setKey].setname[settings.lang]
	domdom.updateTextByID(newElementID+"-namename", newElementSetName)

	let newElementSetNameRarity = rtdrarity[setKeyInfo.rarity].color[settings.lang]
	if (rtdset[setKey].hasOwnProperty("rarity") === true) {
		for (let sr_i = 0; sr_i < rtdset[setKey].rarity.length; sr_i++) {
			let rarityID = rtdset[setKey].rarity[sr_i]
			newElementSetNameRarity = rtdrarity[rarityID].color[settings.lang] + " " + newElementSetNameRarity
		}
	}
	if (setKeyInfo.setid < 100) {
		newElementSetNameRarity += " Set"
	}
	domdom.updateTextByID(newElementID+"-namerarity", newElementSetNameRarity)

	// set items
	for (let si_i = 0; si_i < rtdset[setKey].items.length; si_i++) {
		let equipKey = rtdset[setKey].items[si_i]
		let equipKeyInfo = keyInfo("rtdequip", equipKey)

		let itemRarity = equipKeyInfo.rarity
		let itemName = rtdequip[equipKey].name[settings.lang]
		let itemPos = rtdequip[equipKey].pos

		let itemSelector = "#"+newElementID+" .item-"+equipKeyInfo.type
		let itemElementID = "equip-item-"+equipKey
		domdom.updateAttributeBySelector(itemSelector, "id", itemElementID)

		let itemPropertySelector = "#"+newElementID+" .item-"+equipKeyInfo.type+" .equip-img-container .equip-list-img"
		let itemNameSelector = "#"+newElementID+" .item-"+equipKeyInfo.type+" .equip-name .name"

		domdom.updateAttributeBySelector(itemPropertySelector, "data-rarity", itemRarity)
		domdom.updateAttributeBySelector(itemPropertySelector, "data-offset", itemPos)
		domdom.updateTextBySelector(itemNameSelector, itemName)
		domdom.updateAttributeBySelector(itemSelector, "data-show", 1)


		// classes for weapon and offhand
		if (rtdequip[equipKey].hasOwnProperty("class") === true) {
			let itemClass = rtdequiptype["class"+rtdequip[equipKey].class][settings.lang]
			let itemClassSelector = "#"+newElementID+" .item-"+equipKeyInfo.type+" .equip-name .equip-class"

			domdom.updateTextBySelector(itemClassSelector, itemClass)
		}
		
		
		// add fixed attributes
		if (rtdequip[equipKey].hasOwnProperty("effects") === true) {
			let itemFixedAttributes = [...rtdequip[equipKey].effects]
			
			for (var ifa_i = 0; ifa_i < itemFixedAttributes.length; ifa_i++) {
				let itemEffectData = itemFixedAttributes[ifa_i]
				let itemEffectDataKey = itemEffectData[0]
				
				let fixedAttributeElement = domdom.newEleFromModel(elementTemplates.fixedAttribute)
				let attributeElementID = elementTemplates.fixedAttributePrefix + equipKey + "-" + itemEffectDataKey
				fixedAttributeElement.id = attributeElementID
				let attributeContainerSelector = itemSelector+" .equip-fixed-attributes"

				domdom.eleBySelector(attributeContainerSelector).appendChild(fixedAttributeElement)
				
				let attributeText = ""

				if (itemEffectDataKey.slice(0,1) == "s") {
					// its a basic stat
					attributeText = rtdstat[itemEffectDataKey].name[settings.lang] + " " + rtdstat[itemEffectDataKey].unit[0] + itemEffectData[1] + rtdstat[itemEffectDataKey].unit[1]
				} else if (itemEffectDataKey.slice(0,1) == "e") {
					// s effect
					let copyItemEffectData = [...itemEffectData]
					copyItemEffectData.shift()
					attributeText = txt(rtdeffect[itemEffectDataKey].desc[settings.lang], copyItemEffectData)

				}

				domdom.updateTextByID(attributeElementID, attributeText)
				domdom.updateAttributeByID(attributeElementID, "data-show", 1)
			}
		}	
		
		// add handler
		document.getElementById(itemElementID).onclick = function () {
			settings.notice = ""
			if (["r1","r2"].indexOf(equipKeyInfo.type) !== -1) {
				if (settings.build.r1.k === null) {
					settings.build.r1.k = equipKey
					calcSetupSet()
				} else if (settings.build.r2.k === null) {
					settings.build.r2.k = equipKey
					calcSetupSet()
				} else {
					settings.notice = "Remove one ring to equip"
				}
			} else {
				if (settings.build[equipKeyInfo.type].k === null) {
					settings.build[equipKeyInfo.type].k = equipKey
					calcSetupSet()
				} else {
					settings.notice = "Remove the " + rtdequiptype[equipKeyInfo.type][settings.lang] + " to equip"
				}
			}
		}
	}

	// set set effects
	if (rtdset[setKey].hasOwnProperty("effects") === true) {
		let effectsObject = rtdset[setKey].effects
		for (let effectKey in effectsObject) {
			let seteffectcount = effectKey.slice(1)
			let description = ""

			// loop through all effects
			for (let se_i = 0; se_i < effectsObject[effectKey].length; se_i++) {
				let effectData = [...effectsObject[effectKey][se_i]]
				let effectDataKey = effectData[0]
				if (effectDataKey.slice(0,1) == "s") {
					// its a basic stat
					let statdesc = rtdstat[effectDataKey].name[settings.lang] + " " + rtdstat[effectDataKey].unit[0] + effectData[1] + rtdstat[effectDataKey].unit[1]
					description += txt(elementTemplates.seteffectvalue, [statdesc])
				} else if (effectDataKey.slice(0,1) == "e") {
					// s effect
					effectData.shift()
					let statdesc = txt(rtdeffect[effectDataKey].desc[settings.lang], effectData)
					description += txt(elementTemplates.seteffectvalue, [statdesc])
				}
			}

			if (description.length) {
				let setEffectSelector = "#"+newElementID+" div .equip-itemset-effectlist .set-" + seteffectcount + " .seteffect-description"
				domdom.updateTextBySelector(setEffectSelector, description)

				let setEffectContainerSelector = "#"+newElementID+" div .equip-itemset-effectlist .set-" + seteffectcount
				domdom.updateAttributeBySelector(setEffectContainerSelector, "data-show", 1)
			}
			
		}
	}
}

function removeSetupSetElement() {
	let setupSetContainer = domdom.eleByID("setup-sets");
	while (setupSetContainer.firstChild) {
	  setupSetContainer.removeChild(setupSetContainer.firstChild);
	}
}

function addSetupSetElement(setKey) {
	let newSetupSetElement = domdom.newEleFromModel(elementTemplates.setupSet)
	let newElementID = elementTemplates.setupSetPrefix + setKey
	newSetupSetElement.id = newElementID
	let setKeyInfo = keyInfo("rtdset", setKey)

	domdom.eleByID("setup-sets").appendChild(newSetupSetElement)

	domdom.updateAttributeBySelector("#"+newElementID+" .setup-set-name", "id", newElementID+"-name")
	domdom.updateAttributeBySelector("#"+newElementID+" .name", "id", newElementID+"-namename")

	// setname
	let newElementSetName = rtdset[setKey].setname[settings.lang]
	domdom.updateTextByID(newElementID+"-namename", newElementSetName)

	// add handler
	document.getElementById(newElementID+"-name").onclick = function () {
		settings.showstats = 0
		if (settings.elr !== "0" && settings.elr !== setKeyInfo.rarity) {
			settings.elr = setKeyInfo.rarity
		}

		setTimeout(function(){
		    domdom.eleByID("equip-itemset-"+setKey).scrollIntoView({
		      behavior: 'smooth', block: 'center'
		    });

		    domdom.eleByID("equip-itemset-"+setKey).classList.toggle('fade-it');
		    setTimeout(function(){
		    	domdom.eleByID("equip-itemset-"+setKey).classList.remove('fade-it');
		    }, 2000);
		}, 300);
	}

	// enable set effects based on setup
	let currentMaxSet = settings.buildset[setKey].equips + settings.buildset[setKey].effects

	// set set effects
	if (rtdset[setKey].hasOwnProperty("effects") === true) {
		let effectsObject = rtdset[setKey].effects
		for (let effectKey in effectsObject) {
			let seteffectcount = effectKey.slice(1)
			let description = ""

			if (seteffectcount <= currentMaxSet) {
				let setEffectContainerSelectorForEnable = "#"+newElementID+" div .setup-set-effectlist .set-" + seteffectcount
				domdom.updateAttributeBySelector(setEffectContainerSelectorForEnable, "data-disabled", 0)
			}

			// loop through all effects
			for (let se_i = 0; se_i < effectsObject[effectKey].length; se_i++) {
				let effectData = [...effectsObject[effectKey][se_i]]
				let effectDataKey = effectData[0]
				if (effectDataKey.slice(0,1) == "s") {
					// its a basic stat
					let statdesc = rtdstat[effectDataKey].name[settings.lang] + " " + rtdstat[effectDataKey].unit[0] + effectData[1] + rtdstat[effectDataKey].unit[1]
					description += txt(elementTemplates.seteffectvalue, [statdesc])
				} else if (effectDataKey.slice(0,1) == "e") {
					// s effect
					effectData.shift()
					let statdesc = txt(rtdeffect[effectDataKey].desc[settings.lang], effectData)
					description += txt(elementTemplates.seteffectvalue, [statdesc])
				}
			}

			if (description.length) {
				let setEffectSelector = "#"+newElementID+" div .setup-set-effectlist .set-" + seteffectcount + " .seteffect-description"
				domdom.updateTextBySelector(setEffectSelector, description)

				let setEffectContainerSelector = "#"+newElementID+" div .setup-set-effectlist .set-" + seteffectcount
				domdom.updateAttributeBySelector(setEffectContainerSelector, "data-show", 1)
			}
		}
	}

	// set set equip items
	for (let si_i = 0; si_i < rtdset[setKey].items.length; si_i++) {
		let equipKey = rtdset[setKey].items[si_i]
		let equipKeyInfo = keyInfo("rtdequip", equipKey)

		let itemRarity = equipKeyInfo.rarity
		let itemName = rtdequip[equipKey].name[settings.lang]
		let itemPos = rtdequip[equipKey].pos

		let itemSelector = "#"+newElementID+" .setup-set-equiplist .sei-"+equipKeyInfo.type
		let itemElementID = "sei-"+equipKey
		domdom.updateAttributeBySelector(itemSelector, "id", itemElementID)

		let itemPropertySelector = "#"+itemElementID+" .equip-img-container .equip-list-img"


		domdom.updateAttributeBySelector(itemPropertySelector, "data-rarity", itemRarity)
		domdom.updateAttributeBySelector(itemPropertySelector, "data-offset", itemPos)

		domdom.updateAttributeBySelector(itemSelector, "data-show", 1)

		// show equipped
		let equippedSlotItemKey = settings.build[equipKeyInfo.type].k

		if ((equippedSlotItemKey !== null && equippedSlotItemKey == equipKey)
			|| (settings.build.r1.k !== null && settings.build.r1.k == equipKey)
			|| (settings.build.r2.k !== null && settings.build.r2.k == equipKey)) {
			domdom.updateAttributeBySelector(itemSelector, "data-equipped", 1)
		}

		// add handler
		document.getElementById(itemElementID).onclick = function () {
			settings.showstats = 0
			if (settings.elr !== "0" && settings.elr !== setKeyInfo.rarity) {
				settings.elr = setKeyInfo.rarity
			}

			setTimeout(function(){
			    domdom.eleByID("equip-item-"+equipKey).scrollIntoView({
			      behavior: 'smooth', block: 'center'
			    });

			    domdom.eleByID("equip-item-"+equipKey).classList.toggle('fade-it');
			    setTimeout(function(){
			    	domdom.eleByID("equip-item-"+equipKey).classList.remove('fade-it');
			    }, 2000);
			}, 300);
		}
	}


}

function removeSetupRandElement() {
	let setupRandContainer = domdom.eleByID("setup-randomattributes");
	while (setupRandContainer.firstChild) {
	  setupRandContainer.removeChild(setupRandContainer.firstChild);
	}
	settings.showrand = 0
}

function addRandomAttributeElement(slot, equipKey) {
	let newSetupRandElement = domdom.newEleFromModel(elementTemplates.setupRand)
	let newRAElementID = elementTemplates.setupRandPrefix + slot + "-" + equipKey
	newSetupRandElement.id = newRAElementID

	domdom.eleByID("setup-randomattributes").appendChild(newSetupRandElement)

	domdom.updateAttributeBySelector("#"+newRAElementID+" .setup-randomattributes-equipname", "id", newRAElementID+"-equipname")
	domdom.updateAttributeBySelector("#"+newRAElementID+" .setup-randomattributes-fields", "id", newRAElementID+"-fields")

	// setname
	let newElementEquipName = rtdequip[equipKey].name[settings.lang]
	domdom.updateTextByID(newRAElementID+"-equipname", newElementEquipName)

	// add the select
	let equipEffects = [...rtdequip[equipKey].effects]



	for (let raee_i = 0; raee_i < equipEffects.length; raee_i++) {
		if (equipEffects[raee_i][0] === "e007") {

			for (let rpe_i = 0; rpe_i < equipEffects[raee_i][1]; rpe_i++) {
				let newRPEElement = domdom.newEleFromModel(elementTemplates.setupRandSelect)
				let newRPEElementID = elementTemplates.setupRandPrefix + slot + "-" + equipKey + "-" + elementTemplates.setupRandSelectPrefix + rpe_i
				newRPEElement.id = newRPEElementID

				domdom.eleByID(newRAElementID+"-fields").appendChild(newRPEElement)

				let newRPEOptionDefaultElementID = newRPEElementID + "-" + elementTemplates.setupRandOptionPrefix + "default"
				domdom.updateAttributeBySelector("#"+newRPEElementID+" .option-default", "id", newRPEOptionDefaultElementID)
				domdom.updateAttributeByID(newRPEOptionDefaultElementID, "value", slot + "," + rpe_i + ",-1")


				let rpeRandomEffects = [...rtdrandomeffect[equipKey]]

				for (let rpere_i = 0; rpere_i < rpeRandomEffects.length; rpere_i++) {
					let copyRPEData = [...rpeRandomEffects[rpere_i]]
					let rpeEffectKey = copyRPEData[0]
					let repEffectValue = copyRPEData[1]

					let attributeText = txt(rtdeffect[rpeEffectKey].desc[settings.lang], [repEffectValue])

					let newRPEOptionElement = domdom.newEleFromModel(elementTemplates.setupRandOption)
					let newRPEOptionElementID = newRPEElementID + "-" + elementTemplates.setupRandOptionPrefix + rpere_i
					newRPEOptionElement.id = newRPEOptionElementID

					domdom.eleByID(newRPEElementID).appendChild(newRPEOptionElement)

					domdom.updateAttributeByID(newRPEOptionElementID, "value", slot + "," + rpe_i + "," + rpere_i)
					domdom.updateTextByID(newRPEOptionElementID, attributeText)

					// select this one if its already added in the settings
					if (settings.build[slot].s.length > rpe_i) {
						let selectedEffect = settings.build[slot].s[rpe_i]
						if (rtdrandomeffect[equipKey][rpere_i][0] === selectedEffect[0] && rtdrandomeffect[equipKey][rpere_i][1] === selectedEffect[1]) {
							domdom.eleByID(newRPEOptionElementID).selected = true
						}
					}

				}

				// disable this select if the previous ones are not used
				if (settings.build[slot].s.length < rpe_i) {
					domdom.updateAttributeByID(newRPEElementID, "disabled", "disabled")
				}

				domdom.eleByID(newRPEElementID).addEventListener('change', function() {
					let rpeData = this.value.split(",")
					console.log(rpeData)
					if (rpeData[2] == -1) {
						settings.build[rpeData[0]].s.splice(rpeData[1], 1);
					} else {
						let chosenEffectKey = settings.build[rpeData[0]].k
						let chosenEffectIndex = rpeData[2]

						let effectChosen = rtdrandomeffect[chosenEffectKey][chosenEffectIndex]

						let sIndex = rpeData[1]
						if (settings.build[rpeData[0]].s.length < sIndex) {
							sIndex = settings.build[rpeData[0]].s.length
						}

						settings.build[rpeData[0]].s[sIndex] = effectChosen
					}
					calcSetupSet()
				});
			}
		}
	}

	// add options


	settings.showrand = 1
}

function calcSetupSet() {

	// add all sets
	settings.buildset = {}
	settings.buildsetbonuseffects.c = 0
	settings.buildsetbonuseffects.l = 0
	settings.buildsetbonuseffects.h = 0
	settings.buildsetbonuseffects.i = 0
	settings.buildsetbonuseffects.e = 0
	settings.buildsetbonuseffects.m = 0

	for (setupItemKey in settings.build) {
		let setupItemData = settings.build[setupItemKey]

		if (setupItemData.k !== null) {
			let equipKey = setupItemData.k
			let setid = rtdequip[equipKey].setid
			if (rtdset[setid].hasOwnProperty("effects") === true) {
				if (settings.buildset.hasOwnProperty(setid) === false) {
					settings.buildset[setid] = {equips:1,effects:0}
				} else {
					// increase equip count for this set
					settings.buildset[setid].equips += 1
				}
			}

			if (rtdequip[equipKey].hasOwnProperty("effects") === true) {
				let equipEffects = [...rtdequip[equipKey].effects]
				// add the random attributes (from .s)
				if (setupItemData.s.length > 0) {
					equipEffects = equipEffects.concat(setupItemData.s);
				}

				for (let ee_i = 0; ee_i < equipEffects.length; ee_i++) {
					let equipEffect = equipEffects[ee_i]
					if (["e001","e002","e003","e004","e005","e006"].indexOf(equipEffect[0]) !== -1) {
						let effectKey = equipEffect[0]
						let bonus = equipEffect[1]
						//loop through all rarity it can give bonus
						for (let esb_i = 0; esb_i < rtdeffect[effectKey].effects.setbonus.length; esb_i++) {
							let rarityBonus = rtdeffect[effectKey].effects.setbonus[esb_i]
							if (settings.buildsetbonuseffects[rarityBonus] < bonus) {
								settings.buildsetbonuseffects[rarityBonus] = bonus
								calcSetBonusFromSetEffects()
							}
						}
					}
				}
			}
		}
	}
	calcSetBonusFromSetEffects()

	function calcSetBonusFromSetEffects() {
		// from set effects
		for (setid in settings.buildset) {
			let setKeyInfo = keyInfo("rtdset", setid)
			if (settings.buildset[setid].effects < settings.buildsetbonuseffects[setKeyInfo.rarity]) {
				settings.buildset[setid].effects = settings.buildsetbonuseffects[setKeyInfo.rarity]
			}
			//now check if we got more bonus from the set effects
			let setEffects = rtdset[setid].effects
			let currentMaxSet = settings.buildset[setid].equips + settings.buildset[setid].effects
			for (setEffectKey in setEffects) {
				let setEffectData = setEffects[setEffectKey]
				let currentSetEffect = setEffectKey.slice(1,2)
				if (currentSetEffect <= currentMaxSet) {
					// look for more bonus on this set effect
					//console.log(setEffectData)
					for (let seb_i = 0; seb_i < setEffectData.length; seb_i++) {
						let setEffect = setEffectData[seb_i]
						if (["e001","e002","e003","e004","e005","e006"].indexOf(setEffect[0]) !== -1) {
							let effectKey = setEffect[0]
							let bonus = setEffect[1]
							//loop through all rarity it can give bonus
							for (let esb_i = 0; esb_i < rtdeffect[effectKey].effects.setbonus.length; esb_i++) {
								let rarityBonus = rtdeffect[effectKey].effects.setbonus[esb_i]
								if (settings.buildsetbonuseffects[rarityBonus] < bonus) {
									settings.buildsetbonuseffects[rarityBonus] = bonus
									calcSetBonusFromSetEffects()
									refreshSetupSetElements()
								}
							}
						}
					}
				}
			}
		}
	}

	refreshSetupSetElements()
	setUrl()
	updateSetupStatElement()
}

function refreshSetupSetElements() {
	removeSetupSetElement()

	for (let setKey in settings.buildset) {
		if (settings.buildset[setKey].equips > 0) {
			addSetupSetElement(setKey)
		}
	}

	// also refresh the random attributes
	refreshSetupRandElements()

	// also refresh stats
	// TO DO
}

function refreshSetupRandElements() {
	removeSetupRandElement()

	for (let slotKey in settings.build) {
		if (settings.build[slotKey].k !== null) {
			let equipKey = settings.build[slotKey].k
			if (rtdequip[equipKey].hasOwnProperty("effects") === true) {
				let equipEffects = [...rtdequip[equipKey].effects]
				for (let sree_i = 0; sree_i < equipEffects.length; sree_i++) {
					let setupRandEquipEffect = equipEffects[sree_i]
					if (["e007"].indexOf(setupRandEquipEffect[0]) !== -1) {
						addRandomAttributeElement(slotKey, equipKey)
					}
				}
			}
		}
	}
}

function setUrl() {
	const nowhitespace = JSON.stringify(settings.build);
	lib.compress(nowhitespace).then(output => {
		settings.url = output;
		setSearchParam("b", settings.url)
	});


	function setSearchParam(key, value) {
	    if (!window.history.pushState) {
	        return;
	    }

	    if (!key) {
	        return;
	    }

	    var url = new URL(window.location.href);
	    var params = new window.URLSearchParams(window.location.search);
	    if (value === undefined || value === null) {
	        params.delete(key);
	    } else {
	        params.set(key, value);
	    }

	    url.search = params;
	    url = url.toString();
	    window.history.replaceState({url: url}, null, url);
	}
}

function getUrl() {
	let url = new URL(window.location.href);
	let b = url.searchParams.get("b");
	lib.decompress(b).then(output => {
		settings.build = JSON.parse(output)
		calcSetupSet()

		for (let slot in settings.build) {
			if (settings.build[slot].k !== null) {
				settings.showstats = 1
			}
		}
	});

}

function initBuilder() {
	try {
		initData()
		initElements()
		getUrl()
		domdom.updateAttributeByID("load", "data-show", 1)
	} catch(e) {
		console.error(e)
		alert(e)
	}
}
let gameUILoop = function () { 
	domdom.updateTextByID("notice-msg", settings.notice)

	for (let slot in settings.build) {
		let slotData = settings.build[slot]

		if (slotData.k == null) {
			// clear the data
			domdom.updateAttributeBySelector("#setup-"+slot+" .equip-img", "data-rarity", 0)
			domdom.updateAttributeBySelector("#setup-"+slot+" .equip-img", "data-offset", 0)
			domdom.updateAttributeBySelector("#setup-"+slot+" .equip-img", "data-type", 0)
		} else {
			let equipKeyInfo = keyInfo("rtdequip", slotData.k)

			let itemRarity = equipKeyInfo.rarity
			let itemPos = rtdequip[slotData.k].pos
			let itemType = equipKeyInfo.type

			domdom.updateAttributeBySelector("#setup-"+slot+" .equip-img", "data-rarity", itemRarity)
			domdom.updateAttributeBySelector("#setup-"+slot+" .equip-img", "data-offset", itemPos)
			domdom.updateAttributeBySelector("#setup-"+slot+" .equip-img", "data-type", itemType)
		}
	}


	// hide setup sets if there is no sets
	if (Object.keys(settings.buildset).length === 0 && settings.buildset.constructor === Object) {
		domdom.updateAttributeByID("stats-section", "data-show", 0)
	} else {
		domdom.updateAttributeByID("stats-section", "data-show", 1)
	}


	if (settings.showstats === 1) {
		domdom.updateAttributeByID("equiplistnav", "data-equiplist", 0)
		domdom.updateAttributeByID("equiplist-section", "data-equiplist", 0)
	} else {
		domdom.updateAttributeByID("equiplistnav", "data-equiplist", 1)
		domdom.updateAttributeByID("equiplist-section", "data-equiplist", 1)


		domdom.updateAttributeByID("equip-itemset-filter", "data-color", settings.elr)
		domdom.updateAttributeByID("equip-itemset-list", "data-color", settings.elr)
	}

	if (settings.showrand === 1) {
		domdom.updateAttributeByID("setup-randomattributes", "data-randomattributes", 1)
	} else {
		domdom.updateAttributeByID("setup-randomattributes", "data-randomattributes", 0)
	}

}

initBuilder()

let _gameUILoopId = setInterval(gameUILoop, 1000 / 20)