-   Mladen Prajdic has a [great
    post](http://weblogs.sqlteam.com/mladenp/archive/2007/07/06/60250.aspx)
    on handling a database in your unit tests. He mentions
    [NDbUnit](http://www.ndbunit.org/) but seems mostly to favor SQL
    2005′s database snapshot feature. He’s got sample code for creating
    and restoring a snapshot. (via
    [DNK](http://www.dotnetkicks.com/architecture/Ways_to_revert_a_database_to_pre_Test_state_after_Unit_testing))
-   [Microsoft Robotics Studio
    1.5](http://www.microsoft.com/downloads/details.aspx?FamilyId=73092FF6-E37B-45C6-8E5E-C23D5D632B1E&displaylang=en)[released
    yesterday](http://www.microsoft.com/presspass/press/2007/jul07/07-09msrspr.mspx).
    Tandy Trower – GM of the Robotics group – [has the
    details](http://msdn2.microsoft.com/en-us/robotics/bb625969.aspx) on
    what’s new.
-   Herb Sutter has a [new
    column](http://www.ddj.com/dept/architect/200001985) in Dr. Dobbs on
    concurrency. First up, “building a consistent mental model for
    reasoning about concurrency”. Sounds like a must read column. (via
    [LtU](http://lambda-the-ultimate.org/node/2339))
-   Scott Hanselman
    [describes](http://www.hanselman.com/blog/SezYouArchitectureAndTheArchitectureNinja.aspx)
    “Sez You Architecture”. I wonder, do architecture ninjas get to wear
    a [Shinobi shozoku](http://en.wikipedia.org/wiki/Shinobi_shozoku)?
-   From the Not Everyone Agrees With DevHawk Dept.: Libor Soucek
    [disagrees with
    me](http://lsblog.wordpress.com/2007/07/05/avoid-durable-messages-in-enterprise-services/)
    and thinks that durable messaging should be avoided. I had a hard
    time following Libor’s logic but needless to say, I disagree with
    his disagreement. He writes that one of the reasons to use DM is for
    “Cooperating on transaction with external system”. While multiple
    systems may be cooperating on a *business* transaction, in no way do
    I believe they are going to cooperate on a *database* transaction.
    But since he started talking about [the
    DTC](http://msdn2.microsoft.com/en-us/library/ms684146.aspx), I
    suspect we’re talking past each other. Libor, [drop me a
    line](mailto:harry%20dot%20pierson%20at%20microsoft%20dot%20com) and
    we can discuss further.

