Some first-thoughts on the database infrastructure for the tables I'm going to need. 


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
