package main

import (
	"embed"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"

	"path/filepath"
	"os"
	"fmt"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	
	ex, x := os.Executable()
    if x != nil {
        panic(x)
    }
    exPath := filepath.Dir(ex)
	fmt.Println("=========================")
    fmt.Println(exPath)
	
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Boardli",
		Width:  1600,
		Height: 900,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Frameless: true,
		CSSDragProperty: "widows",
        CSSDragValue:    "1",
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
