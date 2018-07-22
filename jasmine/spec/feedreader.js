/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         function iterateObjs(obj){
            it('has urls', function(){
                expect(obj.url).toBeDefined();
                expect(obj.url.length).not.toBe(0);
            })

            it('has names', function(){
                expect(obj.name).toBeDefined();
                expect(obj.name.length).not.toBe(0);
            })
         }

          for(var x = 0; x < allFeeds.length; x++) {
            iterateObjs(allFeeds[x]);
          }

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    });

    describe('The menu', function(){
      
        const body = document.getElementsByTagName('body');

        it('is hidden by default', function(){
            expect(body[0]).toHaveClass("menu-hidden")          
        })

        const menuLink = document.getElementsByClassName('menu-icon-link');

        it('is shown when clicked', function(){
            var spyEvent = spyOnEvent(menuLink[0], 'click')
                $(menuLink[0]).click();
            expect(body[0]).not.toHaveClass("menu-hidden") 
        })

        it('is hidden when clicked again', function(){
            var spyEvent = spyOnEvent(menuLink[0], 'click')
                $(menuLink[0]).click();
            expect(body[0]).toHaveClass("menu-hidden") 
        }) 
    });


    describe('Initial Entries', function(){
    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loads feeds', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        })

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    });

    describe('New Feed Selection', function(){
        beforeEach(function(done) {
            loadFeed(1, done);
        });

        let arr = document.getElementsByClassName("entry");

        

        console.log(arr);

        it('changes content', function(){
        let firstEntry = $(arr[0]).find('h2').text();
        let secondEntry = $(arr[1]).find('h2').text();
        console.log(firstEntry)
        console.log(secondEntry)
        console.log(firstEntry === secondEntry);
        console.log(firstEntry === firstEntry);
        console.log(firstEntry === "Your Body Text is Too Small")
            expect(firstEntry === secondEntry).toBeFalsy();
        })

    });
}());
