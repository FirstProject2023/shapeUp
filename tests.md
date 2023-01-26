    <TouchableOpacity onPress={()=> setIsArticles(false)} style={[styles.ArticlesNavButtons, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}, isArticles ? {backgroundColor: '#fff'} : {backgroundColor: '#d89b5c'}]}>
      <Text style={[styles.ArticlesNavText, isArticles ? {color: '#d89b5c'} : {color: '#fff'}]}>Recipes</Text>    
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> setIsArticles(true)} style={[styles.ArticlesNavButtons, {borderTopRightRadius: 10, borderBottomRightRadius: 10}, isArticles ? {backgroundColor: '#d89b5c'} : {backgroundColor: '#fff'}]}>
      <Text style={[styles.ArticlesNavText, isArticles ? {color: '#fff'} : {color: '#d89b5c'}]}>Articles</Text>
    </TouchableOpacity>