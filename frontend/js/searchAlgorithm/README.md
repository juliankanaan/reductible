# Search Algorithm 

User query is compared to actual JSON API results. 

```
userQuery = 'head concussion occ';
jsonData  = 'concussion occ w/ mcc';

```
'isolateWords()` function makes an array from each individial word: ie `["head", "concussion", "occ", "w/", "mcc"]`

`differenceBuilder()` function returns the differences between the two arrays.: ie. `["head", "mcc", "w/"]`

`merge()` and `join()` puts them together into a fresh new query: `head concussion occ w/ mcc` 
