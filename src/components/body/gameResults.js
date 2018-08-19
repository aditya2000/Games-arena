import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';


import './gameResults.css';
class GameResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            select: '',
            platform: ''
        }
        this.updateSearch = this.updateSearch.bind(this);
    }

    componentDidMount() {
        fetch('http://starlord.hackerearth.com/gamesext')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            this.setState({
                data:data,
                loading: false,
                searchTerm: '',
            })

        })
    }

    updateSearch(e) {
        this.setState({
            searchTerm: e.target.value
        });
    }

    render() {
        let data = this.state.data;
        let filteredData = data.filter(
            (game) => {
                return game.title.toString().toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1;
        });

        if(this.state.platform !== '') {
            filteredData = data.filter((game) => game.platform === this.state.platform)
        }

        if(this.state.select === 'ascending') {
            filteredData.sort((a, b) => {
                if(a.score > b.score) {
                    return 1;
                } 
                if(a.score < b.score) {
                    return -1;
                }
            });
        } else if(this.state.select === 'descending') {
            filteredData.sort((a, b) => {
                if(a.score < b.score) {
                    return 1;
                } 
                if(a.score > b.score) {
                    return -1;
                }
            });
        } else {

        }

        
        return(
            <div>
                <input
                    value={this.state.searchTerm}
                    onChange={this.updateSearch}
                    className="search-bar"
                    placeholder="Search Your Favourite"
                />
                <select value={this.state.select} defaultValue='Sort By Score' onChange={(e) => {this.setState({select: e.target.value})}} className="select-input">
                    <option value="" >Sort By Score</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending" >Descending</option>
                </select>
                <select value={this.state.platform} defaultValue='Sort By Platform' onChange={(e) => {this.setState({platform: e.target.value})}} className="select-input">
                    <option value="" >Sort By Platforms</option>
                    <option value="PlayStation Vita">PlayStation Vita</option>
                    <option value="PlayStation 3" >PlayStation 3</option>
                    <option value="PlayStation">PlayStation</option>
                    <option value="iPad" >iPad</option>
                    <option value="Xbox 360" >Xbox 360</option>
                    <option value="Macintosh" >Macintosh</option>
                    <option value="PC" >PC</option>
                    <option value="iPhone" >iPhone</option>
                    <option value="Android" >Android</option>
                    <option value="Nintendo DS" >Nintendo DS</option>
                    <option value="Nintendo 3DS" >Nintendo 3DS</option>
                    <option value="Nintendo 64" >Nintendo 64</option>
                    <option value="Nintendo 64DD" >Nintendo 64DD</option>
                    <option value="Wii" >Wii</option>
                    <option value="Wii U" >Wii U</option>
                    <option value="Linux" >Linux</option>
                    <option value="Dreamcast" >Dreamcast</option>
                    <option value="Dreamcast VMU" >Dreamcast VMU</option>
                    <option value="Game Boy" >Game Boy</option>
                    <option value="Game Boy Color" >Game Boy Color</option>
                    <option value="NeoGeo Pocket Color" >NeoGeo Pocket Color</option>
                    <option value="Game.Com" >Game.Com</option>
                    <option value="Lynx" >Lynx</option>
                </select>
                <div className="game-results">
                    {this.state.loading===true?<CircularProgress />:
                    <Grid container spacing={24}>
                        {filteredData.map((game) => 
                        <Grid item xs={12} sm={6} key={Math.random()} className="game">
                            <h3 className="game-title">{game.title}</h3>
                            <p>{game.platform}</p> 
                            <p>{game.score}</p>
                                <br/><br/>
                            <p>Genre: {game.genre}</p>
                            <p>Release Year: {game.release_year}</p>
                            <Tooltip title="Editor's Choice">
                                {game.editors_choice === 'Y'?<i className="fas fa-star fa-2x" style={{color:"yellow"}}></i>:<p></p> }
                            </Tooltip>
                        </Grid>)}   
                    </Grid>}    
                </div> 
            </div>
        );
    }
}

export default GameResults;