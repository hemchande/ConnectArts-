import NavBar from "../../components/navbar";
function PreferencesPage() {
    return (
        <div class="preferencespage">
                    <NavBar />

            <h2>Performer Preferences</h2>
            <form>
            <div id="checkboxes">
      <label for="one">
        <input type="checkbox" id="one" />Dance Option 1</label>
        <br></br>
      <label for="two">
        <input type="checkbox" id="two" />Dance Option 2</label>
        <br></br>

      <label for="three">
        <input type="checkbox" id="three" />Dance Option 3</label>
        <br></br>

    </div>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default PreferencesPage;