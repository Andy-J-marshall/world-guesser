interface BorderingCountriesClueProps {
    clues: string | undefined;
}

function BorderingCountriesClue(props: BorderingCountriesClueProps) {
    const clues = props.clues;

    return (
        <div id='country-initial-clue'>
            {clues && <p>The remaining bordering countries begin with the following letters: {clues}</p>}
        </div>
    );
}

export default BorderingCountriesClue;
