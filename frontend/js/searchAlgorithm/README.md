# Search Algorithm 
Some explanation of the stuff going on in the AJAX query. 

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

## Filtering out garbage data
Sometimes billing data looks odd (ie. $1.2M charge for a simple concussion or $0 for heart surgery). 

Let's filter that out. 

`withinOne()` hangs out at the end of `searchResults()`, allowing only data that is *within one standard deviation* of the rest of the population data. Outliers are out of there. I should have enough data so this isn't a problem.  
