package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/fs"
	"log"
	"os"
	"os/user"
	"path"
	"strings"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	"github.com/lucsky/cuid"
)

type Board struct {
	Id              string `json:"_id"`
	Slug            string `json:"slug"`
	Title           string `json:"title"`
	WorkspaceId     string `json:"workspaceId"`
	CreatedAt       int64  `json:"createdAt"`
	UpdatedAt       int64  `json:"updatedAt"`
	Lists           []List `json:"lists"`
}

type List struct {
	Id        string `json:"_id"`
	Title     string `json:"title"`
	Order     int    `json:"order"`
	CreatedAt int64  `json:"createdAt"`
	UpdatedAt int64  `json:"updatedAt"`
	Cards     []Card `json:"cards"`
}

type Card struct {
	Id          string `json:"_id"`
	Title       string `json:"title"`
	Order       int    `json:"order"`
	Description string `json:"description"`
	CreatedAt   int64  `json:"createdAt"`
	UpdatedAt   int64  `json:"updatedAt"`
}

type BoardIdentity struct {
	Id string `json:"_id"`
	Title string `json:"title"`
	Slug string `json:"slug"`
}

type WorkspaceCacheIdentity struct {
	Id string `json:"_id"`
	Title string `json:"title"`
	Slug string `json:"slug"`
	Boards []BoardIdentity `json:"boards"`
}

type WorkspaceIdentity struct {
	Id string `json:"_id"`
	Title string `json:"title"`
	Slug string `json:"slug"`
}

type Settings struct {
	DataPath string `json:"dataPath"`
	Theme string `json:"theme"`
	CurrentBoard string `json:"currentBoard"`
}

// App struct
type App struct {
	ctx                 context.Context
	executablePath      string
	currentBoard        Board
	settings 		    Settings
	workspaceIdentities []WorkspaceCacheIdentity 
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	currentUser, err := user.Current()
	if err != nil {
		log.Fatal(err.Error())
	}
	fmt.Println("Hello " + currentUser.Username)
	a.loadSettings()
	a.loadData()
	fmt.Printf("%v", a.settings)

}

func (a *App) loadSettings() {

	path := "_settings.json"

	if _, err := os.Stat(path); os.IsNotExist(err) {

		s := Settings{
			DataPath: "data",
			Theme: "dark",

		}

		a.settings = s
		a.saveSettings()

	} else {

		f, err := os.ReadFile(path)
		
		if err != nil {
			log.Fatal(err)
		}

		err = json.Unmarshal(f, &a.settings)

		if err != nil {
			log.Fatal(err)
		}
	}
}

func (a *App) generateDefaultLists() []List {

	lists := []List{}
	titles := []string{"Doing", "Done"}
	ts := time.Now().Unix()

	for i, t := range titles {
		l := List{
			Id: cuid.New(),
			Title: t,
			Order: i,
			CreatedAt: ts,
			UpdatedAt: ts,
			Cards: []Card{},
		}
		lists = append(lists, l)
	}

	return lists
}

func (a *App) loadData() {
	if _, err := os.Stat(a.settings.DataPath); os.IsNotExist(err) {

		wId := cuid.New()
		bId := cuid.New()

		err := os.MkdirAll(a.settings.DataPath + "/" + wId + "/boards", os.ModePerm)

		wi := WorkspaceCacheIdentity {
			Id: wId,
			Title: "Boards",
			Slug: "boards",
		}

		identities := []WorkspaceCacheIdentity {
			{
				Id: wi.Id,
				Title: wi.Title,
				Slug: wi.Slug,
				Boards: []BoardIdentity {
					{
						Id: bId,
						Title: "My Board",
						Slug: "my-board",
					},
				},
			},
		}

		ts := time.Now().Unix()

		cb := Board {
			Id: bId,
			Title: "My Board",
			Slug: "my-board",
			WorkspaceId: wId,
			CreatedAt: ts,
			UpdatedAt: ts,
			Lists: a.generateDefaultLists(),
		}

		a.setCurrentBoard(cb)
		a.writeDataToFile("_cache.json", identities)
		a.writeDataToFile(wId + "/_workspace.json", wi)
		a.writeDataToFile(wId + "/boards/" + bId + ".json", cb)

		a.workspaceIdentities = identities

		if err != nil {
			log.Fatal(err)
		}
	} else {
		err := a.readDataFromFile("_cache.json", &a.workspaceIdentities) 

		if err != nil {
			log.Fatal(err)
		}
	}
}

func (a *App) writeDataToFile(path string, data interface{}) error {
	bs, err := json.Marshal(data)

	if err != nil {
		return err
	}

	err = os.WriteFile(a.settings.DataPath + "/" + path, bs, 0644)

	if err != nil {
		return err
	}

	return nil
}

func (a *App) readDataFromFile(path string, dest any) error {
	f, err := os.ReadFile(a.settings.DataPath + "/" + path)
		
	if err != nil {
		return err
	}

	err = json.Unmarshal(f, dest)

	if err != nil {
		return err
	}

	return nil
}


// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetOsUserName() string {
	currentUser, err := user.Current()
	if err != nil {
		log.Fatal(err.Error())
	}
	return currentUser.Username
}

func (a *App) GetTestJSON() string {
	return getFileContentsAsString(a.executablePath + "data/test/test.json")
}

func getFileContentsAsString(path string) string {
	f, err := os.ReadFile(path)
	if err != nil {
		return ""
	}
	return string(f)
}

func (a *App) ReadBoardsDir() []string {
	dir := "data/boards"
	root := os.DirFS(dir)
	jsonFiles, err := fs.Glob(root, "*.json")
	var files []string
	if err != nil {
		log.Fatal(err)
	}
	for _, v := range jsonFiles {
		files = append(files, path.Join(dir, v))	
	}
	return files
}

func (a *App) ChangeCurrentBoard(boardId string, workspaceId string) Board {

	path := workspaceId + "/boards/" + boardId + ".json"

	err := a.readDataFromFile(path, &a.currentBoard)
	if err != nil {
		log.Fatal(err)
	}

	a.settings.CurrentBoard = path
	a.saveSettings()

	return a.currentBoard
}

func (a *App) setCurrentBoard(b Board) Board {
	a.currentBoard = b
	return a.currentBoard
}

func (a *App) saveSettings() {
	data, err := json.Marshal(a.settings)

	if err != nil {
		log.Fatal("failed serialize settings")
	}

	err = os.WriteFile("_settings.json", data, 0644)

	if err != nil {
		log.Fatal("Failed to write settings file")
	}
}

func (a *App) GetCurrentBoard() Board {

	if a.currentBoard.Id == "" {
		if a.settings.CurrentBoard != "" {
			a.readDataFromFile(a.settings.CurrentBoard, &a.currentBoard)
			return a.currentBoard
		} else {
			entries, err := os.ReadDir(a.settings.DataPath)
			if err != nil {
				log.Fatal(err)
			}

			for _, e := range entries {

				if !strings.Contains(e.Name(), ".json") {

					boards, err := os.ReadDir(a.settings.DataPath + "/" + e.Name() + "/boards")

					if err != nil {
						log.Fatal(err)
					}

					for _, b := range boards {
						
						if strings.Contains(b.Name(), ".json") {

							a.readDataFromFile(e.Name() + "/boards/" + b.Name(), &a.currentBoard)

							a.settings.CurrentBoard = e.Name() + "/boards/" + b.Name()
							a.saveSettings()
							return a.currentBoard
						}

					}

				}

			}
		}
	}

	return a.currentBoard
}

func (a *App) saveCurrentBoard() {
	a.writeDataToFile(a.currentBoard.WorkspaceId + "/boards/" + a.currentBoard.Id + ".json", a.currentBoard)
}

func (a *App) AddBoard(title string, slug string, workspaceId string) []WorkspaceCacheIdentity {
	bId := cuid.New()
	ts := time.Now().Unix()
	bi := BoardIdentity {
		Id: bId,
		Title: title,
		Slug: slug,
	}
	nb := Board {
		Id: bId,
		Title: title,
		Slug: slug,
		WorkspaceId: workspaceId,
		CreatedAt: ts,
		UpdatedAt: ts,
	}

	a.writeDataToFile(workspaceId + "/boards/" + bId + ".json", nb)

	for i, _ := range a.workspaceIdentities {
		if a.workspaceIdentities[i].Id == workspaceId {
			if a.workspaceIdentities[i].Boards != nil {
				a.workspaceIdentities[i].Boards = append(a.workspaceIdentities[i].Boards, bi)
			} else {
				a.workspaceIdentities[i].Boards = []BoardIdentity{ bi }
			}
		}
	}

	a.writeDataToFile("_cache.json", a.workspaceIdentities)

	return a.workspaceIdentities

}

func (a *App) AddList(l List) Board {
	a.currentBoard.Lists = append(a.currentBoard.Lists, l);
	a.saveCurrentBoard()
	return a.currentBoard
}

func (a *App) UpdateLists(ls []List) Board {
	a.currentBoard.Lists = ls
	a.saveCurrentBoard()
	return a.currentBoard
}

func (a *App) DeleteList(id string) Board {
	index := 0
	for i, v := range a.currentBoard.Lists {
		if v.Id == id {
			index = i
		}
	}
	a.currentBoard.Lists = append(a.currentBoard.Lists[:index], a.currentBoard.Lists[index + 1:]...)
	a.saveCurrentBoard()
	return a.currentBoard
}

func (a *App) GetWorkspaceIdentities() []WorkspaceCacheIdentity {
	return a.workspaceIdentities
}

func (a *App) CloseApp() {
	runtime.Quit(a.ctx)
}

func (a *App) MinimiseApp() {
	runtime.WindowMinimise(a.ctx)
}

func (a *App) ToggleFullscreen() {
	runtime.WindowToggleMaximise(a.ctx)
}