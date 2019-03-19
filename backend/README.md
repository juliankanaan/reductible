Some first-thoughts on the database infrastructure for the tables I'm going to need.

3/2 update: Because of how inconsistent procudure names are across bills -- I need the user to confirm which items are most like theirs. This necessitates a DB column `confirmed`.

## Unconfirmed (raw user input)

Logic: Each additional user-entered line item is put into table as new row.

Use: These items are used in a "first-run query"

table: `items_`

| id    | user_id   | procedure        | url_ending    | charge    | confirmed  |  
| ----- | --------- | ---------------- | ------------- | --------- | ---------- |
| 1     |  434      | blood draw       | 4323          | 342.44    |  0         |
| 2     |  353      | vaccination      | 42            | 210.00    |  0         |

## Confirmed (refined user input)

User chooses from "first-run query" results to refine their input. "Better" `procedure` input is replaced in table via SQL `UPDATE`.  

table: `items_`

| id    | user_id   | procedure        | url_ending  | charge    | confirmed  |
| ----- | --------- | ---------------- | ------------| --------- | ---------- |
| 1     |  434      | BLOOD DRAW 30ML  | 4323        | 342.44    |  1         |
| 2     |  353      | HEP-C INJECTION 3| 42          | 210.00    |  1         |
