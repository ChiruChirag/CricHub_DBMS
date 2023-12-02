import express from "express";
import mysql from "mysql2"; 
import cors from "cors";

const app = express();
app.use(express.json()); // Apply globally if you want to parse JSON for all routes

app.use(cors());
app.use(express.json());

let user_id=null;
let numberOfMatches=null;
let tournamentId=null;
let matchId=null;
const db = mysql.createConnection({
    user : 'root',
    host : 'localhost',
    password : 'Chirag@sql',
    database : 'cricketdb',
})
db.connect((err,res)=>{
    if(!err) {
        console.log('Database connected');
    }
    else{
    console.log(err);
    }
})




app.post('/register', (req, res) => {
    const sql = "INSERT INTO Users (`username`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error occurred while registering user" });
        } else {
            console.log('User inserted successfully !');
            return res.json(result);
        }
    });
});

app.post('/login',(req,res) =>{
    const sql = "SELECT * FROM Users WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data)=>{
        if(err) return res.status(500).json({ message: "Error occurred" });
        if(data.length > 0){
            user_id = data[0].user_id;
            console.log(user_id);
            // Send the success message and owner_id in the response
            return res.status(200).json({ message: "Login Success", user_id });
        }
        else{
            return res.status(401).json({ message: "Invalid Email or Password" });
        }
    });
});


app.post('/tournament/register', (req, res) => {
    const { tournament_name, start_date, end_date, num_matches } = req.body;
  
    // Assuming user_id is already set after login
    if (user_id) {
      const tournamentSql =
        'INSERT INTO Tournaments (user_id, tournament_name, start_date, end_date, numberOfMatches) VALUES (?, ?, ?, ?, ?)';
      db.query(
        tournamentSql, 
        [user_id, tournament_name, start_date, end_date, num_matches],      
        (err, result) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ message: 'Error occurred while registering tournament' });
          } else {
            const tournamentId = result.insertId; // Get the generated tournamentId
            console.log('Tournament registered successfully!');
            return res.json({ message: 'Tournament registered successfully!' , tournamentId});

          }
        }
      );
    } else {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
  });

// Add this route in your backend code

app.get('/matches', (req, res) => {
    const matchQuery = 'SELECT * FROM Matches';
    db.query(matchQuery, (error, results, fields) => {
        if (error) {
            console.error('Error fetching match details:', error);
            res.status(500).json({ message: 'Error fetching match details' });
        } else {
            console.log('Match details fetched successfully:', results);
            res.json(results);
        }
    });
});

// app.post('/match/:matchId/submit', (req, res) => {
//     const { matchId } = req.params;
//     const {
//         team1,
//         team2,
//         runs_team1,
//         runs_team2,
//         wickets_team1,
//         wickets_team2,
        
//     } = req.body;

//     const sql = 'INSERT INTO Matches (match_id, team1, team2, runs_team1, runs_team2, wickets_team1, wickets_team2) VALUES (?, ?, ?, ?, ?, ?, ? )';
//     const values = [matchId, team1, team2, runs_team1, runs_team2, wickets_team1, wickets_team2];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Error occurred while adding match details:', err);
//             return res.status(500).json({ message: 'Error occurred while adding match details' });
//         }
//         console.log('Match details added successfully!');
//         return res.json({ message: 'Match details added successfully!' });
//     });
// });


app.post('/match/add', (req, res) => {
    const {
        tournament_id,
        stadium_id,
        team1,
        team2,
        runs_team1,
        runs_team2,
        wickets_team1,
        wickets_team2
    } = req.body;
    console.log(tournament_id,
        stadium_id,
        team1,
        team2,
        runs_team1,
        runs_team2,
        wickets_team1,
        wickets_team2)
    // Assuming user_id is already set after login
    if (user_id) {
        const matchSql =
            'INSERT INTO Matches (tournament_id, stadium_id, team1_name, team2_name, runs_team1, runs_team2, wickets_team1, wickets_team2) VALUES (?,  ?, ?, ?, ?, ?, ?, ?)';
        db.query(
            matchSql,
            [tournament_id, stadium_id, team1, team2, runs_team1, runs_team2, wickets_team1, wickets_team2],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(500)
                        .json({ message: 'Error occurred while adding match details' });
                } else {
                    console.log('Match details added successfully!');
                    const newMatchId = result.insertId;
                    
                    return res.json({ message: 'Match details added successfully!' ,newMatchId});
                }
            }
        );
    } else {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
});

// Add this route in your backend code

app.post('/match/:matchId/players/add', (req, res) => {
    const { players } = req.body;
    const { matchId } = req.params;

    // Validate if players array is present and is an array
    if (!Array.isArray(players) || players.length === 0) {
        return res.status(400).json({ message: 'Invalid or missing players data' });
    }

    // Log received player data
    console.log('Received players data for matchId backend:', matchId);
    console.log('Players Data:', players);

    // Prepare player values for batch insertion
    const playerValues = players.map((player) => [
        matchId,
        player.name,
        player.runs,
        player.wickets
    ]);
    console.log('Prepared Player Values:', playerValues);
    // Log the SQL query
    const sql = 'INSERT INTO Players (match_id, player_name, runs, wickets) VALUES ?';
    console.log('SQL Query:', sql, playerValues);

    // Execute the database query
    db.query(sql, [playerValues], (err, result) => {
        if (err) {
            console.error('Error occurred while adding player details:', err);
            return res.status(500).json({ message: 'Error occurred while adding player details' });
        }
        console.log('Player details added successfully!');
        const newMatchId = result.insertId;

        return res.json({ message: 'Player details added successfully!', newMatchId });
    });
});

  

app.get('/match/:matchId/players', (req, res) => {
    const { matchId } = req.params;
  
    const team1PlayersQuery = `SELECT * FROM Players WHERE match_id = ${matchId}`;
    const team2PlayersQuery = `SELECT * FROM Players WHERE match_id = ${matchId}`;
  
    db.query(team1PlayersQuery, (error1, team1Players) => {
      if (error1) {
        console.error('Error fetching team 1 players:', error1);
        res.status(500).json({ message: 'Error fetching team 1 players' });
      } else {
    db.query(team2PlayersQuery, (error2, team2Players) => {
          if (error2) {
            console.error('Error fetching team 2 players:', error2);
            res.status(500).json({ message: 'Error fetching team 2 players' });
          } else {
            res.json({ team1Players, team2Players });
          }
        });
      }
    });
  });
  // Add route to register teams
app.post('/teams', (req, res) => {
    const { team_name } = req.body;

    console.log(team_name)
    // Assuming user_id is already set after login
    if (user_id) {
        const teamSql = 'INSERT INTO Teams (team_name) VALUES (?)';
        db.query(teamSql, [team_name], (err, result) => {
            if (err) {
                console.error('Error registering team:', err);
                return res.status(500).json({ message: 'Error registering team' });
            } else {
                const teamId = result.insertId;
                console.log('Team registered successfully!');
                return res.json({ message: 'Team registered successfully!', teamId });
            }
        });
    } else {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
});

// Add this route in your backend code
app.get('/tournament/:tournamentName/runs', (req, res) => {
    const tournamentName = req.params.tournamentName;

    const getRunsProcedure = `CALL GetRunsByTournament(?)`;

    db.query(getRunsProcedure, [tournamentName], (error, results, fields) => {
        if (error) {
            console.error('Error fetching runs:', error);
            res.status(500).json({ message: 'Error fetching runs' });
        } else {
            console.log('Runs fetched successfully:', results[0]);
            res.json(results[0]);
        }
    });
});
app.get('/tournament/:tournamentName/player/:playerName/runs', (req, res) => {
    const { tournamentName, playerName } = req.params;

    const getRunsByPlayerFunction = `SELECT GetTotalRunsByPlayer(?, ?) AS totalRuns`;
    
    db.query(getRunsByPlayerFunction, [tournamentName, playerName], (error, results, fields) => {
        if (error) {
            console.error('Error fetching player runs:', error);
            res.status(500).json({ message: 'Error fetching player runs' });
        } else {
            console.log('Player runs fetched successfully:', results[0].totalRuns);
            res.json({ totalRuns: results[0].totalRuns });
        }
    });
});
app.get('/messages/latest', (req, res) => {
    const latestMessageQuery = 'SELECT message FROM Messages ORDER BY id DESC LIMIT 1';
    db.query(latestMessageQuery, (error, results, fields) => {
        if (error) {
            console.error('Error fetching latest message:', error);
            res.status(500).json({ message: 'Error fetching latest message' });
        } else {
            const latestMessage = results[0] ? results[0].message : null;
            res.json({ message: latestMessage });
        }
    });
});
app.get('/matches/players-with-high-scores', (req, res) => {
    const query = `
        SELECT match_id, team1_name, team2_name
        FROM Matches
        WHERE match_id IN (
            SELECT match_id
            FROM Players
            WHERE runs > 50
            GROUP BY match_id
            HAVING COUNT(player_id) >= 2
        );
    `;
    
    db.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error fetching matches with players scoring more than 50 runs:', error);
            res.status(500).json({ message: 'Error fetching data' });
        } else {
            res.json(results);
        }
    });
});


// Backend API endpoint
app.get('/players/top-performers', (req, res) => {
    const query = `
      SELECT 
        player_name, 
        (SELECT SUM(runs) FROM Players p WHERE p.player_name = Players.player_name) AS total_runs,
        (SELECT SUM(wickets) FROM Players p WHERE p.player_name = Players.player_name) AS total_wickets
      FROM Players
      GROUP BY player_name
      ORDER BY total_runs DESC, total_wickets DESC
      LIMIT 5;
    `;
  
    db.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching top scorers:', error);
        return res.status(500).json({ message: 'Error fetching top scorers' });
      }
      return res.json(results);
    });
  });
  
  
app.listen(3001,()=>{
    console.log("Connected to backend");
})