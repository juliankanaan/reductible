Some first-thoughts on the database infrastructure for the tables I'm going to need. 

3/2 update: Because of how inconsistent procudure names are across bills -- I need the user to confirm which items are most like theirs. This necessitates a DB column `confirmed`. 

## Unconfirmed (raw user input) 

Logic: Each additional user-entered line item is put into table as new row.

Use: These items are used in a "first-run query" 

table: `items_`

| id    | user_id   | procedure        | medical_code  | charge    | confirmed  | 
| ----- | --------- | ---------------- | ------------- | --------- | ---------- |
| 1     |  434      | blood draw       | 4323-2333     | 342.44    |  0         |
| 2     |  353      | vaccination      | 42-443-244    | 210.00    |  0         |

## Confirmed (refined user input) 

User chooses from "first-run query" results to refine their input. "Better" `procedure` input is replaced in table.  

table: `items_`

| id    | user_id   | procedure        | medical_code  | charge    | confirmed  | 
| ----- | --------- | ---------------- | ------------- | --------- | ---------- |
| 1     |  434      | BLOOD DRAW 30ML  | 4323-2333     | 342.44    |  1         |
| 2     |  353      | HEP-C INJECTION 3| 42-443-244    | 210.00    |  1         |



## Invoice Table: 

Logic: Invoice 


| id    | user_id   | hospital         | date  | invoice_id |
| ----- | --------- | ---------------- | ----- | ---------- | 
| 1     |  434      | methodist        | 32433 | 3224       | 
| 2     |  353      | texas children's | 43244 | 543        |




## Line Item Table 

Logic: Each additional user-entered line item is put into a big table 


| id    | user_id   | procedure        | medical_code  | charge    | invoice_id |
| ----- | --------- | ---------------- | ------------- | --------- | ---------- | 
| 1     |  434      | blood draw       | 4323-2333     | 342.44    | 3232       |
| 2     |  353      | vaccination      | 42-443-244    | 210.00    | 543        |


Will query for line items grouped by common invoice_id 
