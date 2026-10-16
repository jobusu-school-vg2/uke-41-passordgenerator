import React, { useState } from 'react';
import { Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import Config from './config';


// Funksjon for å få total antall av de spefiserte tegnene i passordet
function getStringCharsCount(str: string, charsToCount: string[]): number {
	// Deler passordet inn i en array av individuelle tegn
	// Filtrer ut sånn at den bare beholder tegn som er inkludert i charactersToCount.
	// Så retunerer lengden på arrayen
	return str.split('').filter(char => charsToCount.includes(char)).length;
}

function generateRandomPassword(charsToUse: string[], passwordLength: number, minSymbols: number): string {
	let symbolCount = -1;
	let password: string[] = [];

	while (symbolCount < minSymbols) {
		password = [];
        
		for (let i = 0; i < passwordLength; i++) {
			password.push(charsToUse[Math.floor(Math.random() * charsToUse.length)]);
		}

		symbolCount = getStringCharsCount(password.join(""), Config.symboler);
	}

	return password.join("");
}


export default function App() {
	const [isEnabledSmaaBokstaver, setIsEnabledSmaaBokstaver] = useState(false);
    const [isEnabledStoreBokstaver, setIsEnabledStoreBokstaver] = useState(false);
    const [isEnabledTall, setIsEnabledTall] = useState(false);
    const [isEnabledSymboler, setIsEnabledSymboler] = useState(false);

	const [antallTegn, setAntallTegn] = useState(0);
    const [minimumSymboler, setMinimumSymboler] = useState(0);

	const [passord, setPassord] = useState("");

	// Funksjon for å generere tilfeldig passord
    function genererPassord(minSymboler = minimumSymboler): string {
        let lovligeTegn: string[] = [];
        
        if (isEnabledSmaaBokstaver) { lovligeTegn = lovligeTegn.concat(Config.smaaBokstaver); }
        if (isEnabledStoreBokstaver) { lovligeTegn = lovligeTegn.concat(Config.storeBokstaver); }
        if (isEnabledTall) { lovligeTegn = lovligeTegn.concat(Config.tall); }
        if (isEnabledSymboler && minSymboler > 0) { lovligeTegn = lovligeTegn.concat(Config.symboler); }

        if (lovligeTegn.length === 0 || antallTegn <= 0) {
            return "";
        }

		return generateRandomPassword(lovligeTegn, antallTegn, minSymboler);
    }

    return (
        <View style={ styles.screen }>
            <View style={ styles.container1 } >                    
                <Text style={ styles.text_heading }>Passordgenerator</Text>         
            </View>
            <View style={ styles.container2 }>
                <View style={ styles.line }>
                    <Text style={ styles.text_line }>Store bokstaver</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        ios_backgroundColor="#3e3e3e"
                        thumbColor= {isEnabledStoreBokstaver ? "#f4f310" : "#f4f3f4"}        
                        onValueChange={() => setIsEnabledStoreBokstaver(!isEnabledStoreBokstaver)}
                        value={isEnabledStoreBokstaver}
                    />
                </View>    
                <View style={ styles.line }>
                    <Text style={ styles.text_line }>Små bokstaver</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        ios_backgroundColor="#3e3e3e"
                        thumbColor= {isEnabledSmaaBokstaver ? "#f4f310" : "#f4f3f4"}         
                        onValueChange={() => setIsEnabledSmaaBokstaver(!isEnabledSmaaBokstaver)}
                        value={isEnabledSmaaBokstaver}
                    />
                </View>    
                <View style={ styles.line }>
                    <Text style={ styles.text_line }>Tall</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        ios_backgroundColor="#3e3e3e"
                        thumbColor= {isEnabledTall ? "#f4f310" : "#f4f3f4"}         
                        onValueChange={() => setIsEnabledTall(!isEnabledTall)}
                        value={isEnabledTall}
                    />
                </View>    
                <View style={ styles.line }>
                    <Text style={ styles.text_line }>Symboler</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        ios_backgroundColor="#3e3e3e"
                        thumbColor= {isEnabledSymboler ? "#f4f310" : "#f4f3f4"}        
                        onValueChange={() => setIsEnabledSymboler(!isEnabledSymboler)}
                        value={isEnabledSymboler}
                    />        
                </View>
                { isEnabledSymboler && (
                    <View style={ styles.line }>
                        <Text style={ styles.text_line }>Minimum symboler</Text>
                        <TextInput 
                            style={ styles.input } 
                            onChangeText={(text) => {
                                const newMinimum = Number(text);
                                setMinimumSymboler(newMinimum);

                                if (getStringCharsCount(passord, Config.symboler) < newMinimum) {
									// Bruker newMinimum variabelen fordi setMinimumSymboler oppdaterer verdien neste frame, men genererPassord bruker verdien fra denne framen
                                    setPassord(genererPassord(newMinimum));
                                }
                            }}
                        />       
                    </View>
                )}
                <View style={ styles.line }>
                    <Text style={ styles.text_line }>Antall tegn</Text>
                    <TextInput 
                        style={ styles.input } 
                        onChangeText={(antallTegn) => setAntallTegn(Number(antallTegn))}
                    />    
                </View>
            </View>
            <View style={ styles.container4 }>
                <Button
                    title="Generer passord"
                    onPress={() => setPassord(genererPassord())}
                />
            </View>
            <View style={ styles.container3 }>
                <Text style={ styles.text_line2 }>Passord:</Text> 
                <Text style={ styles.text_line3 } selectable>{passord}</Text>
            </View>    
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
    },

    container1: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: "center",
        justifyContent: "center",
    },

    container2: {
        flex: 2,
        alignItems: "stretch",
        justifyContent: "center",
        padding: 20,
    },

    container3: {
        flexDirection: "row",
        flex: 2,
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    container4: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
    },

    line: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    input: {
        padding: 10, 
        fontSize: 20,
        backgroundColor: "#f5f5f5",
    },

    text_heading: {
        color: "white",
        fontSize: 35,
    },

    text_line: {
        color: "black",
        fontSize: 20,
    },

    text_line2: {
        color: "black",
        fontSize: 20,
    },

    text_line3: {
        color: "white",
        fontSize: 20,
        backgroundColor: "grey",
    },
});
