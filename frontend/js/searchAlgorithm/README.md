# Search Algorithm 
Some explanation of the stuff going on in the AJAX query. 

## Refining search results cyclically
Because invoice descriptions vary so wildy for the same procedure, the input flow asks the user to confirm which procedure most matches their own with a "soft query" - `searchInitial(query, exceptions)` - of only a few possible matches. *See <a href="https://github.com/juliankanaan/reductible/blob/master/backend/README.md">database infrastructure</a> for how confirming affects records.*

If these soft query results don't match, users can retry `searchInitial()`, **using the first batch of results as an array of exceptions** to be passed to the function. 

`searchInitial(query, exceptions)` runs again, now returning data that is a closer match. Users can restart the query as many times as needed to refine results. 


## Filtering out garbage data
Sometimes billing data looks odd (ie. $1.2M charge for a simple concussion or $0 for heart surgery). 

Let's filter that out. 

`withinOne()` hangs out at the end of `searchResults()`, allowing only results that are **within one standard deviation** of the rest of the population data. Outliers are out, and my sample is a lot cleaner. I should have enough data so population size issues shouldn't be a problem.  


## "Did you mean?" functions

User query is compared to actual JSON API results. 

```
userQuery = 'head concussion occ';
jsonData  = 'concussion occ w/ mcc';

```
`isolateWords()` function makes an array from each individial word: ie `["head", "concussion", "occ", "w/", "mcc"]`

`differenceBuilder()` function returns the differences between the two arrays.: ie. `["head", "mcc", "w/"]`

`merge()` and `join()` puts them together into a fresh new query: `head concussion occ w/ mcc` 

```
Output: Did you mean "head concussion occ w/ mcc"?
```
