Reducing medical bills programmatically by comparing user input to invoice data released by US hospitals. The system catches billing errors such as procedure name - code mismatches & overcharging.

<a href="https://docs.google.com/presentation/d/1x0Bmk2k9GaQcDBAFeGLsh9ttovyHbH5W0aW-5Ok-aAk/edit?usp=sharing">Class Presentation Link (2/20)</a>.

<div style="display: flex; justify-content: center;">
<img style="padding: 20px;" src="https://i.imgur.com/RqI9Ynq.png" width="200">
<img style="padding: 20px;" src="https://i.imgur.com/ORZweWM.png" width="200">
</div>

# Where am I now?
3/4/19: I built most of the user invoice entry, confirmation, view dashboard functions. <a target="" href="https://share.icloud.com/photos/0x--QbyBxBDJvi5NDDX_JdwvQ#14th_St">Demo video.</a>

3/5/19: Built about half of the <a href='https://github.com/juliankanaan/reductible/tree/master/frontend/js/searchAlgorithm'>search algorithm</a> -- including "Did you mean xyz?" functions and filtering for price outliers.

3/18/19: Developed v1 of the <a href='https://github.com/juliankanaan/reductible/tree/master/frontend/js/analysisPresentation'>Analysis feature</a> -- shows a histogram of your item price within market data population.

Highlights: <a href="https://github.com/juliankanaan/reductible/tree/master/frontend/js/searchAlgorithm">Javascript search algorithm</a>, <a href='https://github.com/juliankanaan/reductible/blob/master/frontend/js/scripts.js'>jQuery AJAX database CRUD</a>, <a href='https://github.com/juliankanaan/reductible/blob/master/backend/README.md'>Database Infrastructure</a>, <a href='https://github.com/juliankanaan/reductible/tree/master/frontend/js/analysisPresentation#getting-clean-data'>"Within 1 sigma" method of refining queries</a>.

# Product Roadmap & Thoughts (2/24)
How to move forward building, determining product positioning, & finally marketing this platform?

## Part A: Product Development
As much as I'd love to go with a trendy ReactJS single-page-application, I've built way more products with the classic `PHP, SQL, & Javascript` stack.

### Backend stuff
I'll need to write all this:
+ User onboarding `create new user on signup`
+ Form handling `user invoice info input into a DB`
+ Database creation `user_invoices,  medication_pricing_reference, procedure_pricing_reference`

### Frontend stuff
Here's a rundown of the pages I'll need to build (roughly in terms of user flow):
+ index.php `landing page`
+ login.php `login`
+ dashboard.php `user's profile, past invoice submissions & analyses`
+ submit.php `user input from invoices`
+ invoice-[1243534] `analysis page for each submission that shows what Reductible found (visible only to right user)`

## Part B: Product Roadmap
Since doing complicated queries with all this data is hard, I should start with checking **medication prices**.
+ v1: Reductible checks your hospital bills for potential overcharging of administered medication
+ v2: Reductible *also* catches mistakes with procedure names / codes.
+ v?: Reductible *also* can tell you how your procedure costs compare to market averages (a la TrueCar?)

## Part C: Product Marketing

+ Who's my customer?
+ What painpoints / hangups would they have about this service? (need customer interviews)
