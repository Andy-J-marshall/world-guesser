import { expect, Locator, Page } from "@playwright/test";

export class CountryGuesserPage {
  readonly page: Page;

  readonly header: Locator;
  readonly countrySearchBox: Locator;
  readonly countrySubmitButton: Locator;
  readonly invalidGuessFeedback: Locator;
  readonly countryGuessFeedback: Locator;
  readonly topCountryInList: Locator;
  readonly successMessage: Locator;
  readonly successFlag: Locator;
  readonly bestScoreText: Locator;

  readonly populationClue: Locator;
  readonly regionClue: Locator;
  readonly subregionClue: Locator;
  readonly flagClue: Locator;
  readonly landlockedClue: Locator;
  readonly capitalClue: Locator;
  readonly countryGuesser: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = page.locator("h1");
    this.countryGuesser = page.locator("#country-guesser");
    this.countrySearchBox = page.locator(
      "#country-search input:nth-of-type(1)"
    );
    this.countrySubmitButton = page.locator("#guess-button");
    this.invalidGuessFeedback = page.locator("#invalid-guess-feedback");
    this.countryGuessFeedback = page.locator("#country-guess-feedback");
    this.successMessage = page.locator("#successful-country-game > h5");
    this.successFlag = page.locator("#successful-country-game > img");
    this.bestScoreText = page.locator(
      "#country-guesser-stats > div > p:nth-child(2)"
    );
    this.topCountryInList = page.locator("#country-search-typeahead-item-0");
    this.populationClue = page.locator("#population");
    this.regionClue = page.locator("#region");
    this.subregionClue = page.locator("#subregion");
    this.flagClue = page.locator("#flag");
    this.landlockedClue = page.locator("#landlocked");
    this.capitalClue = page.locator("#capital");
  }

  async goto() {
    await this.page.goto("/");
  }

  async toHaveTitle() {
    await expect(this.page).toHaveTitle(/Fun With Countries/);
  }

  async visualTest() {
    await expect(this.countryGuesser).toHaveScreenshot();
  }
}
